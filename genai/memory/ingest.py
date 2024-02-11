"""Load html from files, clean up, split, ingest into Weaviate."""
import logging
import os
import re
# from parser import langchain_docs_extractor

import weaviate
import faiss
from bs4 import BeautifulSoup, SoupStrainer
from langchain_community.document_loaders import RecursiveUrlLoader, SitemapLoader, DirectoryLoader
from langchain.indexes import SQLRecordManager
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.utils.html import (PREFIXES_TO_IGNORE_REGEX,
                                  SUFFIXES_TO_IGNORE_REGEX)
from langchain.vectorstores.weaviate import Weaviate

from _index import index
from chain import get_embeddings_model
from constants import WEAVIATE_DOCS_INDEX_NAME

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


WEAVIATE_URL = os.environ["WEAVIATE_URL"]
WEAVIATE_API_KEY = os.environ["WEAVIATE_API_KEY"]
RECORD_MANAGER_DB_URL = os.environ["RECORD_MANAGER_DB_URL"]

print(f"WEAVIATE_URL = {WEAVIATE_URL}")
print(f"WEAVIATE_API_KEY = {WEAVIATE_API_KEY}")
print(f"RECORD_MANAGER_DB_URL = {RECORD_MANAGER_DB_URL}")

def metadata_extractor(meta: dict, soup: BeautifulSoup) -> dict:
    title = soup.find("title")
    description = soup.find("meta", attrs={"name": "description"})
    html = soup.find("html")
    return {
        "source": meta["loc"],
        "title": title.get_text() if title else "",
        "description": description.get("content", "") if description else "",
        "language": html.get("lang", "") if html else "",
        **meta,
    }


# def load_xml_docs():
#     return SitemapLoader(
#         "https://python.langchain.com/sitemap.xml",
#         filter_urls=["https://python.langchain.com/"],
#         parsing_function=langchain_docs_extractor,
#         default_parser="lxml",
#         bs_kwargs={
#             "parse_only": SoupStrainer(
#                 name=("md-content", "title", "html", "lang", "content")
#             ),
#         },
#         meta_function=metadata_extractor,
#     ).load()


def load_html_docs():
    return RecursiveUrlLoader(
        url="https://www.managen.ai",
        max_depth=3,
        extractor=simple_extractor,
        prevent_outside=True,
        use_async=True,
        timeout=600,
        # Drop trailing / to avoid duplicate pages.
        link_regex=(
            f"href=[\"']{PREFIXES_TO_IGNORE_REGEX}((?:{SUFFIXES_TO_IGNORE_REGEX}.)*?)"
            r"(?:[\#'\"]|\/[\#'\"])"
        ),
        check_response_status=True,
    ).load()

def load_directory_docs(dir_path, type="md", use_multithreading=True):
    from langchain_community.document_loaders import PythonLoader
    if type == "py":
        loader = DirectoryLoader(dir_path, glob="**/*.py", 
            loader_cls=PythonLoader, 
            use_multithreading=use_multithreading)
    elif type == "md":
        loader = DirectoryLoader(dir_path, glob="**/*.md")
    elif type == "html":
        # from langchain_community.document_loaders import BSHTMLLoader
        from langchain_community.document_loaders import UnstructuredHTMLLoader
        loader = DirectoryLoader(dir_path, glob="**/*.html", 
            loader_cls=UnstructuredHTMLLoader,
            use_multithreading=use_multithreading)
    elif type == "pdf":
        from langchain_community.document_loaders import PyPDFLoader
        loader = DirectoryLoader(dir_path, glob="**/*.pdf", 
            use_multithreading=use_multithreading,
            loader_cls=PyPDFLoader)
    return loader.load()

    # return DirectoryLoader(
    #     directory=dir_path,
    #     extractor=simple_extractor,
    #     prevent_outside=True,
    #     use_async=True,
    #     timeout=600,
    # ).load()

def simple_extractor(html: str) -> str:
    soup = BeautifulSoup(html, "lxml")
    return re.sub(r"\n\n+", "\n\n", soup.text).strip()


# def load_api_docs():
#     return RecursiveUrlLoader(
#         url="https://api.python.langchain.com/en/latest/",
#         max_depth=8,
#         extractor=simple_extractor,
#         prevent_outside=True,
#         use_async=True,
#         timeout=600,
#         # Drop trailing / to avoid duplicate pages.
#         link_regex=(
#             f"href=[\"']{PREFIXES_TO_IGNORE_REGEX}((?:{SUFFIXES_TO_IGNORE_REGEX}.)*?)"
#             r"(?:[\#'\"]|\/[\#'\"])"
#         ),
#         check_response_status=True,
#         exclude_dirs=(
#             "https://api.python.langchain.com/en/latest/_sources",
#             "https://api.python.langchain.com/en/latest/_modules",
#         ),
#     ).load()


def ingest_docs(use_multithreading):
    file_dir = __file__
    folder_path = os.path.dirname(file_dir)+"/../../docs"
    docs_from_documentation = load_directory_docs(folder_path, 
        use_multithreading=use_multithreading, type="md")
    logger.info(f"Loaded {len(docs_from_documentation)} docs from documentation")
    # docs_from_api = load_directory_docs("../../../../cloned", type="py")
    # logger.info(f"Loaded {len(docs_from_api)} docs from cloned repos")
    # WILL WANT TO INCLUDE OTHER ONCE TESTED
    # Folders indluce 'downloaded/(github, pdfs, arxiv, etc.)'

    # docs_from_documentation = load_html_docs()
    # logger.info(f"Loaded {len(docs_from_documentation)} docs from documentation")
    # docs_from_api = load_api_docs()
    # logger.info(f"Loaded {len(docs_from_api)} docs from API")
    # docs_from_langsmith = load_langsmith_docs()
    # logger.info(f"Loaded {len(docs_from_langsmith)} docs from Langsmith")
    # all_docs = docs_from_documentation + docs_from_api + docs_from_langsmith
    all_docs = docs_from_documentation
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=4000, chunk_overlap=200)
    docs_transformed = text_splitter.split_documents(
        all_docs
    )

    # We try to return 'source' and 'title' metadata when querying vector store and
    # Weaviate will error at query time if one of the attributes is missing from a
    # retrieved document.
    for doc in docs_transformed:
        if "source" not in doc.metadata:
            doc.metadata["source"] = ""
        if "title" not in doc.metadata:
            doc.metadata["title"] = ""

    ingest_docs_weaviate(docs_transformed)

def ingest_docs_faiss(docs_transformed, record_manager):
    embeddings = OpenAIEmbeddings()
    db = FAISS.from_documents(docs, embeddings)


def ingest_docs_weaviate(docs_transformed):
    # weaviate_key = os.getenv("WEAVIATE_API_KEY")
    # print(f"weaviate_key = {WEAVIATE_API_KEY}")
    # client = weaviate.connect_to_wcs(
    #     cluster_url=WEAVIATE_URL,  # Replace with your WCS URL
    #     auth_credentials=weaviate.auth.AuthApiKey(WEAVIATE_API_KEY  )
    #     )
    client = weaviate.Client(
        url=WEAVIATE_URL,
        auth_client_secret=weaviate.AuthApiKey(api_key=WEAVIATE_API_KEY),
    )
    embedding = get_embeddings_model()
    vectorstore = Weaviate(
        client=client,
        index_name=WEAVIATE_DOCS_INDEX_NAME,
        text_key="text",
        embedding=embedding,
        by_text=False,
        attributes=["source", "title"],
    )

    record_manager = SQLRecordManager(
        f"weaviate/{WEAVIATE_DOCS_INDEX_NAME}", db_url=RECORD_MANAGER_DB_URL
    )
    record_manager.create_schema()

    # import ipdb; ipdb.set_trace()
    indexing_stats = index(
        docs_transformed,
        record_manager,
        vectorstore,
        cleanup="full",
        source_id_key="source",
        force_update=(os.environ.get("FORCE_UPDATE") or "false").lower() == "true",
    )

    logger.info(f"Indexing stats: {indexing_stats}")

    num_vecs = client.query.aggregate(WEAVIATE_DOCS_INDEX_NAME).with_meta_count().do()
    logger.info(
        f"The target now has this many vectors: {num_vecs}",
    )

def get_args():
    import argparse
    parser = argparse.ArgumentParser(description='Ingest documents into Weaviate')
    parser.add_argument('--use_multithreading', action='store_true', 
        help='Use multithreading to ingest documents')
    return parser.parse_args()

if __name__ == "__main__":
    args = get_args()
    ingest_docs(use_multithreading=args.use_multithreading)
