import arxiv
import os
import requests
from datetime import datetime
from urllib.parse import urlparse, unquote

from database import DatabaseManager
# url_cleaner.py
import re
from urllib.parse import urlparse, urlunparse
from utils import clone_github

# document.py
import os
from urllib.parse import urlparse, unquote
import configparser
# from utils import clone_github


class URLCleaner:
    @staticmethod
    def clean(url):
        # Remove query parameters
        # for example, https://www.google.com/search?q=python+url+cleaner&oq=python+url+cleaner&aqs=chrome..69i57j0l7.10159j0j7&sourceid=chrome&ie=UTF-8
        # becomes https://www.google.com/search
        parsed_url = urlparse(url)
        cleaned_url = urlunparse(parsed_url._replace(query=""))
        return cleaned_url

# DEFAULT_DOC_TYPES = [ArxivDocument, GitHubDocument, PDFDocument, HTMLDocument]

def make_file_name_from_url(url):
    # Removes odd characters from url to make it a valid file name
    # for example, https://www.google.com/search?q=python+url+cleaner&oq=python+url+cleaner&aqs=chrome..69i57j0l7.10159j0j7&sourceid=chrome&ie=UTF-8
    # becomes www.google.com_search_q=python+url+cleaner&oq=python+url+cleaner&aqs=chrome..69i57j0l7.10159j0j7&sourceid=chrome&ie=UTF-8
    # Forbidden characters:
    # # pound.
    # % percent.
    # & ampersand.
    # { left curly bracket.
    # } right curly bracket.
    # \ back slash.
    # < left angle bracket.
    # > right angle bracket.
    # * asterisk.
    # ? question mark.
    # / forward slash.
    # $ dollar sign.


    parsed_url = urlparse(url)
    file_name = parsed_url.netloc + parsed_url.path
    forbidden_chars = ["#", "%", "&", "{", "}", "\\", "<", ">", "*", "?", "/", "$"]
    for char in forbidden_chars:
        file_name = file_name.replace(char, "_")
    file_name = file_name.strip("_")
    if file_name.endswith('.html'):
        file_name = file_name[:-5]
    if file_name.endswith('.htm'):
        file_name = file_name[:-4]  
    file_name = file_name + '.html'
    return file_name


def is_url_html(url):
    # if https or http 

    if url.startswith("http") or url.startswith("https"):
        return True
    return False
    

class Document:
    def __init__(self, url, base_path, overwrite=False, dry_run=False, verbose=False):
        self.original_url = url
        self.cleaned_url = self.url_cleaner(url)
        self.parsed_url = urlparse(self.cleaned_url)
        self.base_path = base_path
        self.overwrite = overwrite
        self.dry_run = dry_run
        self.verbose = verbose
        # Order matters here
        # self.doc_types = {doc_type.__name__: doc_type for doc_type in doc_types}
        self.download_date = None
        self.meta_data = None

    # @staticmethod
    # def create(url, base_path, doc_types=DEFAULT_DOC_TYPES, overwrite=False):        
    #     for doc_type in doc_types:
    #         if doc_type.return_is_doc_type(url):
    #             return doc_type(url, base_path, doc_types, overwrite)
    #     return None
    @staticmethod
    def create(url, base_path, overwrite=False, dry_run=False, verbose=False):
        parsed_url = urlparse(url)

        github_match = url.startswith("https://github.com") or url.startswith("http://github.com")
        github_match = github_match and 'assets' not in url 
        if "arxiv.org" in parsed_url.netloc:
            return ArxivDocument(url, base_path, overwrite, dry_run, verbose)
       
        elif github_match :
            return GitHubDocument(url, base_path, overwrite, dry_run, verbose)
        elif parsed_url.path.endswith(".pdf"):
            return PDFDocument(url, base_path, overwrite, dry_run, verbose)
        elif is_url_html(url):
            return HTMLDocument(url, base_path, overwrite, dry_run, verbose)
        else:
            return None

    @staticmethod
    def return_is_doc_type(url):
        raise NotImplementedError

    def common_url_cleaner(self, url):
        # Common cleaning logic for all document types
        # Remove query parameters
        parsed_url = urlparse(url)
        cleaned_url = urlunparse(parsed_url._replace(query=""))
        return cleaned_url

    def variant_url_cleaner(self, url):
        # Variant cleaning logic for specific document types
        raise NotImplementedError

    def url_cleaner(self, url):
        # Special handling for specific domains (e.g., Arxiv)
        
        cleaned_url = self.common_url_cleaner(url)
        cleaned_url = self.variant_url_cleaner(cleaned_url)
        return cleaned_url

    def file_name(self):
        raise NotImplementedError

    def make_local_path(self):
        raise NotImplementedError

    def get_metadata(self):
        return self.meta_data


    def write_to_disk(self, url, local_path):
        # Common download logic for pdf, html, etc but overridden by class variants
        response = requests.get(url)
        content = response.content
        if response.status_code != 200:
            print(f"Error downloading {url}: {response.status_code}")
            return
        with open(local_path, "wb") as f:
            f.write(content)

    def download(self):
        self.local_path = self.make_local_path()
        if not self.local_path:
            raise ValueError("local_path could not be determined ")
        print(f"local_path={self.local_path}"   )
        if os.path.exists(self.local_path) and not self.overwrite:
            print(f"Document {self.local_path} already exists")
            return None
        if not os.path.exists(os.path.dirname(self.local_path)):
            os.makedirs(os.path.dirname(self.local_path))
        if self.dry_run:
            print(f"Would download {self.original_url} to {self.local_path}")
            return None
        else:
            print(f"Downloading {self.original_url} to {self.local_path}")
            self.write_to_disk(url=self.original_url, local_path=self.local_path)
        self.download_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        return self.local_path


class ArxivDocument(Document):
    @staticmethod
    def return_is_doc_type(url):
        if "arxiv.org" in parsed_url.netloc:
            return True
        return False

    def variant_url_cleaner(self, url):
        # Special handling for specific domains (e.g., Arxiv)
        if "arxiv.org" in url and "/abs/" in url:
            url = re.sub(r'/abs/', '/pdf/', url) + ".pdf"
        return url

    def file_name(self):
        file_name = self.parsed_url.path.strip("/").split("/")[-1]
        return file_name

    def make_local_path(self):
        # parse filename from url to make it something that is compatible for local_paths. Truncate if too long.
        print(f"parsed_url.path={self.parsed_url.path}")
        
        file_name = self.file_name()
        folder_name = file_name.replace(".pdf", "")
        return os.path.join(self.base_path, "pdf", "arxiv", folder_name, file_name)

    def write_to_disk(self, url, local_path):
        print(f"Write to disk: url={url}, local_path={local_path}")
        # if os.path.exists(local_path):
        # import ipdb; ipdb.set_trace() 
        if isinstance(url, list):
            raise ValueError(" (list) urls is not supported: must be a string")
        # get id from url
        # example url: https://arxiv.org/abs/1605.08386v1 or https://arxiv.org/pdf/1605.08386v1.pdf
        # id = "1605.08386v1"
        id = url.split("/")[-1].replace(".pdf", "")
        # for paper in arxiv.Client().results(arxiv.Search(ids)):
        
        # paper = next(arxiv.Client().search(ids))
        client = arxiv.Client()

        search_by_id = arxiv.Search(id_list=[id])
        paper = next(client.results(search_by_id))
        # Download the PDF to a specified directory with a custom filename.
        base_name = os.path.basename(local_path)
        base_path = os.path.dirname(local_path)
        # get date from paper.published and convert to a string with format YYYY-MM
        # example: 2016-05
        # date = paper.published.strftime("%Y-%m")
        # base_path = os.path.join(base_path, date)
        # import ipdb; ipdb.set_trace()
        if not os.path.exists(base_path):
            os.makedirs(base_path)
        paper.download_pdf(dirpath=base_path, filename=base_name)
            
        # """When the result was last updated."""
        # published: datetime
        # """When the result was originally published."""
        # title: str
        # """The title of the result."""
        # authors: List[Author]
        # """The result's authors."""
        # summary: str
        # """The result abstract."""
        # comment: str
        # """The authors' comment if present."""
        # journal_ref: str
        # """A journal reference if present."""
        # doi: str
        # """A URL for the resolved DOI to an external resource if present."""
        # primary_category: str
        # """
        # The result's primary arXiv category. See [arXiv: Category
        # Taxonomy](https://arxiv.org/category_taxonomy).
        # """
        # categories: List[str]
        # """
        # All of the result's categories. See [arXiv: Category
        # Taxonomy](https://arxiv.org/category_taxonomy).
        # """
        # links: List[Link]
        authors = [str(author) for author in paper.authors]
        links = [link.href for link in paper.links]
        categories = [c for c in paper.categories]
        meta_data = {'title': paper.title, 'authors': authors, 
            'date': paper.published, 'abstract': paper.summary, 
            'journal_ref': paper.journal_ref, 'doi': paper.doi, 'primary_category': paper.primary_category, 
            'categories': categories, 'links': links}
        
        self.meta_data = meta_data


class PDFDocument(Document):
    @staticmethod
    def return_is_doc_type(url):
        if parsed_url.path.endswith(".pdf"):
            return True
        return False

    def file_name(self):
        file_name = self.parsed_url.path.strip("/").split("/")[-1]
        return file_name


    def variant_url_cleaner(self, url):
        # Special handling for specific domains (e.g., GitHub)
        url = URLCleaner.clean(url)
        return url

    def make_local_path(self):
        file_name = self.file_name()

        folder_name = file_name.replace(".pdf", "")
        return os.path.join(self.base_path, "pdf", "other", folder_name, file_name)
        # return os.path.join(self.base_path, "pdf", "other", )

    def get_metadata(self):
        # if "arxiv.org" in self.parsed_url.netloc:
        #     return get_arxiv_metadata(self.original_url)
        return None


import re       


class GitHubDocument(Document):
    @staticmethod
    def return_is_doc_type(parsed_url):
        if "github.com" in parsed_url.netloc and "badgen" not in parsed_url.netloc:
            
            return True
        return False


    def variant_url_cleaner(self, url):
        # Special handling for specific domains (e.g., GitHub)
        return url

    def file_name(self):
        pattern = r"github\.com/([^/]+/[^/]+)"
        # pattern = r"github\.com/([^/]+(/[^/]+)?)"
        match = re.search(pattern, self.cleaned_url)
        if match:
            repo_name = match.group(1)  # Extracts the first matched group, which is 'owner/repo'
            repo_name = repo_name.replace(".", "_")
            return repo_name
        else:
            raise ValueError(f"Could not parse repo name from URL {self.cleaned_url}")
   


    def make_local_path(self):
        # Example 
        # https://github.com/ianderrington/genai/
        # ==> base_path/github/ianderrington/genai
        # or  https://github.com/lukasschwab/arxiv.py/blob/master/arxiv/__init__.py
        # ==> base_path/github/lukasschwab/arxiv_py
        # Search for the two words after github.com
        # and between '/'

        # This regex pattern looks for the repository owner and name immediately following 'github.com/'
        repo_name = self.file_name()
        return os.path.join(self.base_path, "github", repo_name)
        

    def get_metadata(self):
        # GitHub specific metadata retrieval
        return None
    
    def write_to_disk(self, url, local_path):
        # Common download logic for pdf, html, etc but overridden by class variants
        # check and see if the local_path is a directory and has content
        # if so, do not clone
        if os.path.exists(local_path) and os.listdir(local_path):
            print(f"repo {local_path} already exists")
            return
        
        
        clone_github(url, local_path, reclone=self.overwrite)


class HTMLDocument(Document):
    @staticmethod
    def return_is_doc_type(url):
        if parsed_url.path.endswith(".html"):
            return True
        return False

    def variant_url_cleaner(self, url):
        # Special handling for specific domains (e.g., GitHub)
        url = URLCleaner.clean(url)
        return url

    def file_name(self):
        return make_file_name_from_url(self.cleaned_url)

    def make_local_path(self):
        return os.path.join(self.base_path, "html", self.file_name())

    def get_metadata(self):
        # HTML specific metadata retrieval
        return None


class DocumentDownloader:
    def __init__(self, base_path, overwrite=False, dry_run=False, verbose=False):
        self.base_path = base_path
        self.overwrite = overwrite
        self.db_manager = DatabaseManager()
        self.dry_run = dry_run
        self.verbose = verbose

    def download(self, url):
        document = Document.create(url, base_path=self.base_path, overwrite=self.overwrite, dry_run=self.dry_run, verbose=self.verbose)
        if not document:
            print(f"Document type not supported for {url}")
            return
        local_path = document.download()
        if not self.dry_run:
            if local_path:
                #update database
                self.db_manager.insert_document(document.original_url, document.local_path, document.download_date)
            meta_data = document.get_metadata()
            if meta_data:
                self.db_manager.insert_metadata(document.local_path, meta_data)
            
    # def close(self):
    #    self.db_manager.close()


import argparse
def arg_parser():
    parser = argparse.ArgumentParser(description="Download a document from a URL")
    parser.add_argument("-u", "--url", help="URL of the document to download")
    parser.add_argument("-b", "--base_path", default='downloads', help="Base path for downloaded documents")
    parser.add_argument("-o", "--overwrite", action="store_true", help="Overwrite existing documents")
    parser.add_argument("-v","--verbose", action="store_true", help="Print verbose output")
    parser.add_argument("-d","--dry_run", action="store_true", help="Print debug output")
    return parser.parse_args()

def url_downloader(url, base_path, overwrite=False, dry_run=False, verbose=False):
    downloader = DocumentDownloader(base_path, overwrite, dry_run=dry_run, verbose=verbose)
    try: 
        downloader.download(url)
    except Exception as e:
        print(f"Error downloading {url} because of {e}")

def main(args):
    url = args.url
    if not url:
        url = input("Enter document URL: ")
    if not url.startswith("http"):
        url = "https://" + url
    url_downloader(url, args.base_path, args.overwrite, args.dry_run, args.verbose)



if __name__ == "__main__":
    args = arg_parser()
    main(args)