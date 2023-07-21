import os
import requests
import networkx as nx
import markdown
import matplotlib.pyplot as plt
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import argparse
from git import Repo


def extract_documents(root_path):
    """Walk through the directory and extract all documents"""
    for root, dirs, files in os.walk(root_path):
        for file in files:
            if file.endswith('.md') or file.endswith('.py'):
                yield os.path.join(root, file)


def parse_markdown(file_path):
    """Parse markdown file and extract links"""
    with open(file_path, 'r') as f:
        md = markdown.markdown(f.read())
        soup = BeautifulSoup(md, features="html.parser")
        for link in soup.find_all('a'):
            yield link.get('href')

def remap_url(url):
        # If it is an http link, then we need to change it to https
    if url.startswith('http://'):
        url = url.replace('http://', 'https://')
    # If it is an arxiv paper but not pointing to the direct pdf, then we need to change the url to contain the pdf
    # Example: url = https://arxiv.org/abs/2203.15556 --> https://arxiv.org/pdf/2203.15556.pdf
    if url.startswith('https://arxiv.org/abs/') and not url.endswith('.pdf'):
        url = url.replace('https://arxiv.org/abs/', 'https://arxiv.org/pdf/') + '.pdf' 
    url.replace('.pdf.pdf', '.pdf')
    
    if 'www.youtube.com' in url:
        url = None
    return url

def save_endpoint_content(url, save_path):
    """Save the content of an endpoint to a local file"""
    if not url:
        return

    if os.path.exists(save_path):
        print(f"file {save_path} already exists")
        return

    url = remap_url(url)
    
    if 'github' not in url:
        response = requests.get(url)
        with open(save_path, 'wb') as out_file:
            print(f"saving {url} to {save_path}")
            out_file.write(response.content)
    else:
        clone_github(url, save_path)

def clone_github(url, save_path):
    Repo.clone_from(url, save_path)


def is_local_file(link):
    """Check if the link is a local file or an endpoint"""
    return bool(urlparse(link).netloc)


def create_graph(root_path, output_path):
    """Create a network graph of files and links"""
    G = nx.DiGraph()
    if not os.path.exists(output_path):
        os.makedirs(output_path) 

    for doc in extract_documents(root_path):
        for link in parse_markdown(doc):
            if is_local_file(link):
                local_path = make_local_path(output_path, link)
                save_endpoint_content(link, local_path)
                G.add_edge(doc, local_path)
            else:
                G.add_edge(doc, link)
    return G


def make_local_path(output_path, link):
    """
    Makes a local path from a link. 
    """
    if 'github' not in link:
        file_suffix = find_link_suffix(link)
    
        link_name = make_link_name(link)
        return os.path.join(output_path, link_name + file_suffix)
    else:
        return output_path
    
def make_link_name(link):
    """It creates a os-safe filename based on the input link"""
    return link.replace('/', '_').replace(':', '_').replace('?', '_').replace('=', '_').replace('&', '_').replace('-', '_').replace(' ', '_')


def find_link_suffix(link):
    """ Determines if the path is an html, or a pdf, or something else """
    if link.endswith('.html'):
        return '.html'
    elif link.endswith('.pdf'):
        return '.pdf'
    else:
        return ''   


def visualize_graph(G):
    """Visualize the network graph"""
    pos = nx.spring_layout(G)
    nx.draw(G, pos, with_labels=True)
    plt.show()


def main():
    parser = argparse.ArgumentParser(description='Build a network graph from mkdocs repository.')
    parser.add_argument('root_path', type=str, help='Path to the root of the mkdocs repository.')
    parser.add_argument('--output_path', type=str, default='./output', help='Path to save the output files. Defaults to ./output')
    
    args = parser.parse_args()
    G = create_graph(args.root_path, args.output_path)
    visualize_graph(G)


if __name__ == "__main__":
    main()

