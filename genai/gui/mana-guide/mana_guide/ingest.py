"""Load html from files, clean up, split, ingest into Vector Database."""
import logging
import os
import re
import hydra
from omegaconf import DictConfig
from typing import Optional

from langchain.indexes import SQLRecordManager
from langchain.text_splitter import RecursiveCharacterTextSplitter

from components._index import index
from components.llm import get_embedding_model


from langchain_community.vectorstores import Qdrant
# from qdrant_client import QdrantClient
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

class VectorManagerBase:
    
    def __init__(self, vector_database_path, vector_collection_name, embedding):
        self.vector_database_path = vector_database_path
        self.vector_collection_name = vector_collection_name
        self.embedding = embedding
        self.vector_store = None
        self.init_vector_store()
    
    def init_vector_store(self):
        raise NotImplementedError

class VectorManagerQdrant(VectorManagerBase):
    def __init__(self, vector_database_path, vector_collection_name, embedding):
        super().__init__(vector_database_path, vector_collection_name, embedding)

    def init_vector_store(self):
        client = qdrant_client.QdrantClient(
            self.vector_database_path,
            api_key=None,#"<qdrant-api-key>", # For Qdrant Cloud, None for local instance
        )

        self.vector_store = Qdrant(
            client=client, collection_name=self.vector_collection_name, 
            embeddings=self.embedding,
        )


class Ingestor:
    def __init__(self, vector_store, record_manager, use_multithreading):
        self.vector_store = vector_store

        self.use_multithreading = use_multithreading
        self.record_manager = record_manager

    def ingest_docs(self, docs_transformed):

        indexing_stats = index(
            docs_transformed,
            self.record_manager,
            self.vector_store,
            cleanup="full",
            source_id_key="source",
            force_update=(os.environ.get("FORCE_UPDATE") or "false").lower() == "true",
        )

        logger.info(f"Indexing stats: {indexing_stats}")       
    
    def __call__(self, docs_transformed):
        return self.ingest_docs(docs_transformed)

class RecordManagerBase:
    def __init__(self, database_index_name, database_name):
        self.database_index_name = database_index_name
        self.database_name = database_name
        self.init_manager()        

    def init_manager(self):
        raise NotImplementedError

    def create_schema(self):
        raise NotImplementedError

class RecordManagerSQL(RecordManagerBase):
    def init_manager(self):
        self.db_url = f"sqlite:///{self.database_name}.db"
        self.record_manager = SQLRecordManager(
            f"{self.database_index_name}", db_url=self.db_url
        )
        self.create_schema()

    def create_schema(self):   
        self.record_manager.create_schema()

class GetDocs:
    def __init__(self, chunk_size, chunk_overlap, use_multithreading):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.use_multithreading = use_multithreading
        self.text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, 
                                                   chunk_overlap=chunk_overlap)
        
    def get_doc_lists(self, folder_path):
        docs_from_documentation = load_directory_docs(folder_path, 
            use_multithreading=self.use_multithreading, type="md")
        logger.info(f"Loaded {len(docs_from_documentation)} docs from documentation")
        docs_from_api = load_directory_docs(folder_path, type="py")
        all_docs =docs_from_documentation + docs_from_api
        # file_dir = __file__
        # folder_path = os.path.dirname(file_dir)+"/../../docs"
        docs_from_documentation = load_directory_docs(folder_path, 
            use_multithreading=self.use_multithreading, type="md")
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
        self.all_docs = all_docs

    def split_docs(self):
        docs_transformed = self.text_splitter.split_documents(
                    self.all_docs
            )
        
        # We try to return 'source' and 'title' metadata when querying vector store and
        # Weaviate will error at query time if one of the attributes is missing from a
        # retrieved document.
        for doc in docs_transformed:
            if "source" not in doc.metadata:
                doc.metadata["source"] = ""
            if "title" not in doc.metadata:
                doc.metadata["title"] = ""
        return docs_transformed
    
    def invoke(self, folder_path):
        self.get_doc_lists(folder_path)
        return self.split_docs()
    
    def __call__(self, folder_path):
        return self.invoke(folder_path)





# def get_args():
#     import argparse
#     parser = argparse.ArgumentParser(description='Ingest documents into Weaviate')
#     parser.add_argument('-t', '--target', default='.', 
#         help='Path to the folder containing the documents to ingest')
#     parser.add_argument('--use_multithreading', action='store_true', 
#         help='Use multithreading to ingest documents')
#     parser.add_argument('--embedding_model', default='azure',
#         help='Embedding model to use for vectorization of documents')
#     parser.add_argument('--vector_store', default='qdrant',
#         help='Vector store to use for indexing')
#     parser.add_argument('--vector_database_path', default='http://localhost:6333',
#         help='Path to the vector database')
#     parser.add_argument('--vector_collection_name', default='Article',
#         help='Name of the collection in the vector database')
#     return parser.parse_args()


# def main():
#     args = get_args()
#     embedding_model = get_embedding_model(args.embedding_model)
#     record_manager = RecordManagerSQL(args.vector_collection_name, "qdrant")
#     vector_manager = VectorManagerQdrant(args.vector_database_path, 
#                                      args.vector_collection_name, 
#                                      embedding_model)
#     ingest_docs = Ingestor(vector_manager.vector_store, record_manager.record_manager, args.use_multithreading)
#     get_docs = GetDocs(1000, 100, args.use_multithreading)
#     docs = get_docs(args.target)
#     # import ipdb; ipdb.set_trace()
#     ingest_docs(docs)



## Lets make the above but using hydra for configuration
    
@hydra.main(version_base="1.3", config_path="configs", config_name="ingest.yaml")
# Commented out to use hydra 1.1.0 in response to this https://github.com/facebookresearch/hydra/issues/2416
# @hydra.main(config_path="../configs", config_name="train.yaml")
def main(cfg: DictConfig) -> Optional[float]:
    """Main entry point for training.

    :param cfg: DictConfig configuration composed by Hydra.
    :return: Optional[float] with optimized metric value.
    """
    # apply extra utilities
    # Raise warnings on the configuration 
    # utils.extras(cfg)
    # metric_dict, _ = train(cfg)
    embedding_model  = hydra.utils.instantiate(cfg.embedding_model)
    record_manager = hydra.utils.instantiate(cfg.record_manager)
    vector_manager = hydra.utils.instantiate(cfg.vector_manager, embedding_model=embedding_model)
    ingestor = hydra.utils.instantiate(cfg.ingestor, vector_manager=vector_manager, record_manager=record_manager)
    get_docs = hydra.utils.instantiate(cfg.get_docs)
    docs = get_docs(cfg.target_docs)
    results = ingestor(docs)
    print(results)

# Let's write down the yaml configuration file for the ingestor
    

    

if __name__ == "__main__":
    main()