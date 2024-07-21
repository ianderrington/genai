"""Load html from files, clean up, split, ingest into Weaviate."""
import logging
import re
from components.langchain_parser import langchain_docs_extractor

from bs4 import BeautifulSoup, SoupStrainer
from langchain_community.document_loaders import RecursiveUrlLoader, SitemapLoader, DirectoryLoader
from langchain.utils.html import (PREFIXES_TO_IGNORE_REGEX,
                                  SUFFIXES_TO_IGNORE_REGEX)
#
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


def load_xml_docs(sitemap_xml, filter_urls):
    return SitemapLoader(
        sitemap_xml,
        filter_urls=filter_urls,
        parsing_function=langchain_docs_extractor,
        default_parser="lxml",
        bs_kwargs={
            "parse_only": SoupStrainer(
                name=("md-content", "title", "html", "lang", "content")
            ),
        },
        meta_function=metadata_extractor,
    ).load()


def load_html_docs(url):
    return RecursiveUrlLoader(
        url=url,
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
    # import ipdb; ipdb.set_trace()
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

def simple_extractor(html: str) -> str:
    soup = BeautifulSoup(html, "lxml")
    return re.sub(r"\n\n+", "\n\n", soup.text).strip()

def load_api_docs(url, exclude_dirs):
    return RecursiveUrlLoader(
        url=url,
        max_depth=8,
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
        exclude_dirs=exclude_dirs,
    ).load()