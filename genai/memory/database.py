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
            pass
            # existing_doc.local_path = local_path
            # existing_doc.download_date = download_date
        else:
            new_doc = Document(url=url, local_path=local_path, download_date=download_date)
            try:
                session.add(new_doc)
                session.commit()
            except Exception as e:
                print(f"An error occurred: {e}")
                import ipdb; ipdb.set_trace()
                session.rollback()

  
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
                pass
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
