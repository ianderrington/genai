from sqlalchemy import create_engine, Column, String, MetaData, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
load_dotenv()

Base = declarative_base()

class Document(Base):
    __tablename__ = 'documents'
    url = Column(String, primary_key=True)
    local_path = Column(String, nullable=False)
    download_date = Column(String, nullable=False)

class Metadata(Base):
    __tablename__ = 'metadata'
    url = Column(String, primary_key=True)
    title = Column(String)
    authors = Column(String)
    date = Column(String)
    abstract = Column(String)
    journal_ref = Column(String)
    doi = Column(String)
    primary_category = Column(String)
    categories = Column(String)
    links = Column(String)
import json
class DatabaseManager:
    def __init__(self):
        db_name = os.getenv("DB_NAME")
        self.engine = create_engine(f'sqlite:///{db_name}')
        Base.metadata.create_all(self.engine)
        self.Session = sessionmaker(bind=self.engine)

    def insert_document(self, url, local_path, download_date):
        session = self.Session()
        existing_doc = session.query(Document).filter(Document.url == url).first()

        if existing_doc:
            existing_doc.local_path = local_path
            existing_doc.download_date = download_date
        else:
            new_doc = Document(url=url, local_path=local_path, download_date=download_date)
            session.add(new_doc)

        session.commit()
        session.close()

    
    def insert_metadata(self, url, metadata):
        session = self.Session()

        try:
            # Serialize complex data types
            if 'authors' in metadata and metadata['authors']:
                metadata['authors'] = json.dumps(metadata['authors'])

            if 'links' in metadata and metadata['links']:
                metadata['links'] = json.dumps(metadata['links'])

            if 'categories' in metadata and metadata['categories']:
                metadata['categories'] = json.dumps(metadata['categories'])

            # Check if metadata already exists
            existing_metadata = session.query(Metadata).filter(Metadata.url == url).first()

            if existing_metadata:
                for key, value in metadata.items():
                    setattr(existing_metadata, key, value)
            else:
                new_metadata = Metadata(url=url, **metadata)
                session.add(new_metadata)

            session.commit()
        except Exception as e:
            session.rollback()  # Rollback the changes on error
            print(f"An error occurred: {e}")
        finally:
            session.close()
            
    def get_document_by_url(self, url):
        session = self.Session()
        doc = session.query(Document).filter(Document.url == url).first()
        session.close()
        return doc

    def get_document_by_local_path(self, local_path):
        session = self.Session()
        doc = session.query(Document).filter(Document.local_path == local_path).first()
        session.close()
        return doc

# import sqlite3
# import os
# from dotenv import load_dotenv
# from sqlalchemy import create_engine, Table, MetaData
# from sqlalchemy.sql import text
# load_dotenv()

# class DatabaseManager:
#     def __init__(self):
#         self.db_name = os.getenv("DB_NAME")
#         self.connection = sqlite3.connect(self.db_name)
#         self.create_table()
#         self.create_metadata_table()

#     def create_table(self):
#         query = """
#         CREATE TABLE IF NOT EXISTS documents (
#             url TEXT PRIMARY KEY,
#             local_path TEXT NOT NULL,
#             download_date TEXT NOT NULL
#         );
#         """
#         self.connection.execute(query)
#         self.connection.commit()

#     def create_metadata_table(self):
#             #     meta_data = {'title': paper.title, 'authors': paper.authors, 
#             # 'date': paper.published, 'abstract': paper.summary, 
#             # 'journal_ref': paper.journal_ref, 'doi': paper.doi, 'primary_category': paper.primary_category, 
#             # 'categories': paper.categories, 'links': paper.links}
#         query = """
#         CREATE TABLE IF NOT EXISTS metadata (
#             url TEXT PRIMARY KEY,
#             title TEXT,
#             authors TEXT,
#             date TEXT,
#             abstract TEXT,
#             journal_ref TEXT,
#             doi TEXT,
#             primary_category TEXT,
#             categories TEXT,
#             links TEXT

#         );
#         """
#         self.connection.execute(query)
#         self.connection.commit()

#     def insert_document(self, url, local_path, download_date):
#         query = "INSERT INTO documents (url, local_path, download_date) VALUES (?, ?, ?)"
#         self.connection.execute(query, (url, local_path, download_date))
#         self.connection.commit()

#     def insert_metadata(self, url, metadata):
#         engine = create_engine('sqlite:///your_database.db')  # replace with your database path
#         metadata_obj = MetaData()
#         metadata_table = Table('metadata', metadata_obj, autoload_with=engine)

#         # Ensure that the metadata dictionary contains a key for each column
#         for column in metadata_table.columns.keys():
#             if column not in metadata:
#                 metadata[column] = None  # or some other default value

#         # Add the url to the metadata dictionary
#         metadata['url'] = url

#         # Insert the metadata into the table
#         with engine.connect() as connection:
#             connection.execute(metadata_table.insert(), [metadata])
#     def get_document_by_url(self, url):
#         query = "SELECT * FROM documents WHERE url = ?"
#         cursor = self.connection.cursor()
#         cursor.execute(query, (url,))
#         return cursor.fetchone()

#     def get_document_by_local_path(self, local_path):
#         query = "SELECT * FROM documents WHERE local_path = ?"
#         cursor = self.connection.cursor()
#         cursor.execute(query, (local_path,))
#         return cursor.fetchone()


#     def close(self):
#         self.connection.close()
