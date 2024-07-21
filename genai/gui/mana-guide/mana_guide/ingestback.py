"""Load html from files, clean up, split, ingest into Weaviate."""
import logging
import os
import re

from langchain.indexes import SQLRecordManager
from langchain.text_splitter import RecursiveCharacterTextSplitter

from components._index import index
from components.llm import get_embedding_model


from langchain_community.vectorstores import Qdrant
from qdrant_client import QdrantClient
import qdrant_client

from components.loaders import load_directory_docs

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Data connector indexing: https://python.langchain.com/docs/modules/data_connection/indexing
# LangChain indexing makes use of a record manager (RecordManager) that keeps track of document writes into the vector store.

# When indexing content, hashes are computed for each document, and the following information is stored in the record manager:

# the document hash (hash of both page content and metadata)
# write time
# the source id – each document should include information in its metadata to allow us to determine the ultimate source of this document

# Compatible Vectorstores: AnalyticDB, AstraDB, AwaDB, Bagel, Cassandra, Chroma, DashVector, 
# DatabricksVectorSearch, DeepLake, Dingo, ElasticVectorSearch, ElasticsearchStore, FAISS, HanaDB, 
# Milvus, MyScale, OpenSearchVectorSearch, PGVector, Pinecone, Qdrant, Redis, Rockset, ScaNN, 
# SupabaseVectorStore, SurrealDBStore, TimescaleVector, Vald, Vearch, VespaStore, Weaviate, ZepVectorStore.



def ingest_docs(
                embedding_model, use_multithreading, 
                folder_path, 
                chunk_size=4000, 
                chunk_overlap=200):
    # file_dir = __file__
    # folder_path = os.path.dirname(file_dir)+"/../../docs"
    docs_from_documentation = load_directory_docs(folder_path, 
        use_multithreading=use_multithreading, type="md")
    logger.info(f"Loaded {len(docs_from_documentation)} docs from documentation")
    docs_from_api = load_directory_docs(folder_path, type="py")
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
    all_docs = docs_from_documentation + docs_from_api
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, 
                                                   chunk_overlap=chunk_overlap)
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

    if vector_store == 'qdrant':
    
        ingest_docs_qdrant(embedding_model=embedding_model,
                            docs_transformed=docs_transformed,
                            database_path="qdrant",
                            vector_database_path=vector_database_path,
                            database_index_name=vector_collection_name)
                           
                           
    # elif VECTOR_STORE == 'weaviate':
    #     ingest_docs_weaviate(docs_transformed, weaviate_url, "docs")
        #r45 ingest_docs_weaviate(docs_transformed, WEAVIATE_URL, WEAVIATE_DOCS_INDEX_NAME)
    else:
        raise ValueError(f"Unknown vector store: {vector_store}")


# def ingest_docs_faiss(docs_transformed, record_manager):
    # embeddings = get_embedding_model()


# def ingest_docs_weaviate(docs_transformed, database_url, database_index_name):

#     client = weaviate.Client(
#         url=database_url,
#         auth_client_secret=weaviate.AuthApiKey(api_key=WEAVIATE_API_KEY),
#     )
#     embedding = get_embedding_model()
#     vectorstore = Weaviate(
#         client=client,
#         index_name=database_index_name,
#         text_key="text",
#         embedding=embedding,
#         by_text=False,
#         attributes=["source", "title"],
#     )

#     record_manager = SQLRecordManager(
#         f"weaviate/{database_index_name}", db_url=RECORD_MANAGER_DB_URL
#     )
#     record_manager.create_schema()

#     indexing_stats = index(
#         docs_transformed,
#         record_manager,
#         vectorstore,
#         cleanup="full",
#         source_id_key="source",
#         force_update=(os.environ.get("FORCE_UPDATE") or "false").lower() == "true",
#     )

#     logger.info(f"Indexing stats: {indexing_stats}")

#     num_vecs = client.query.aggregate(database_index_name).with_meta_count().do()
#     logger.info(
#         f"The target now has this many vectors: {num_vecs}",
#     )



def ingest_docs_qdrant(embedding_model, 
                       docs_transformed, 
                       database_path, 
                       vector_database_path,
                       database_index_name):
    client = qdrant_client.QdrantClient(
        vector_database_path,
        api_key=None,#"<qdrant-api-key>", # For Qdrant Cloud, None for local instance
    )

    vectorstore = Qdrant(
        client=client, collection_name=database_index_name, 
        embeddings=embedding_model,
    ) 
    
    db_url = f"sqlite:///{database_path}.db"
    record_manager = SQLRecordManager(
        f"{database_index_name}", db_url=db_url
    )
    record_manager.create_schema()

    indexing_stats = index(
        docs_transformed,
        record_manager,
        vectorstore,
        cleanup="full",
        source_id_key="source",
        force_update=(os.environ.get("FORCE_UPDATE") or "false").lower() == "true",
    )

    logger.info(f"Indexing stats: {indexing_stats}")



def get_args():
    import argparse
    parser = argparse.ArgumentParser(description='Ingest documents into Weaviate')
    parser.add_argument('--use_multithreading', action='store_true', 
        help='Use multithreading to ingest documents')
    parser.add_argument('--embedding_model', default='azure',
        help='Embedding model to use for vectorization of documents')
    parser.add_argument('--vector_store', default='qdrant',
        help='Vector store to use for indexing')
    parser.add_argument('--vector_database_path', default='http://localhost:6333',
        help='Path to the vector database')
    parser.add_argument('--vector_collection_name', default='Article',
        help='Name of the collection in the vector database')
    return parser.parse_args()

if __name__ == "__main__":
    args = get_args()
    embedding_model = get_embedding_model(args.embedding_model)
    ingest_docs(vector_store=args.vector_store, 
                vector_database_path=args.vector_database_path,
                vector_collection_name=args.vector_collection_name,
                embedding_model=embedding_model, 
                use_multithreading=args.use_multithreading, 
                folder_path='.')
