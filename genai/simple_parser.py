import os
import requests
import networkx as nx
import markdown
import matplotlib.pyplot as plt
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import argparse
from git import Repo
import pickle

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

    if os.path.exists(save_path) and 'github' not in url:
        print(f"url {url} and file {save_path} already exists")
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
            print(f"doc: {doc} link: {link}")
            if is_local_file(link):
                local_path = make_local_path(output_path, link)
                # print(f"doc: {doc} link: {link} local_path: {local_path}")
                # save_endpoint_content(link, local_path)
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
    
        link_name = make_link_name(link + file_suffix)
        return os.path.join(output_path, link_name)
    # return os.path.join(output_path, link_name + file_suffix
    else:
        # parse html pointing to gibhub and make a local path corresponding to the github repo name.
        # example https://github.com/allenai/RL4LMs -> RL4LMs
        # example github.com/allenai/RL4LMs -> RL4LMs
        # use a split and count from the beginning because ending paths might be there

        link = link.replace('https://', '').replace('http://', '').replace('www.', '')
        link = link.split('/')
        print(link, len(link))
        # import ipdb; ipdb.set_trace()
        if len(link) < 3:
            link = ''.join(link)
        else:  
            link = link[2]
        output_path = os.path.join(output_path, link)
        return output_path
    
def make_link_name(link):
    """It creates a os-safe filename based on the input link"""
    return link.replace('/', '_').replace(':', '_').replace('?', '_').replace('=', '_').replace('&', '_').replace('-', '_').replace(' ', '_')


def find_link_suffix(link):
    """ if the path has no .html we append it """
    if not link.endswith('.html') and not link.endswith('.pdf'):
        return '.html'
    # elif link.endswith('.pdf'):
    #     return '.pdf'
    else:
        return ''   


def visualize_graph(G):
    """Visualize the network graph"""
    pos = nx.spring_layout(G)
    nx.draw(G, pos, with_labels=False)
    plt.show()

from pyvis.network import Network

def networkx_to_pyvis(nx_graph):
    """Transform a networkx graph into a pyvis network"""
    pyvis_net = Network(notebook=True)

    for node, node_attrs in nx_graph.nodes(data=True):
        pyvis_net.add_node(node, **node_attrs)

    for source, target, edge_attrs in nx_graph.edges(data=True):
        # assuming edge_attrs is a dictionary of attributes
        pyvis_net.add_edge(source, target, **edge_attrs)

    return pyvis_net


def main():
    parser = argparse.ArgumentParser(description='Build a network graph from mkdocs repository.')
    parser.add_argument('root_path', type=str, help='Path to the root of the mkdocs repository.')
    parser.add_argument('--output_path', type=str, default='./output', help='Path to save the output files. Defaults to ./output')
    parser.add_argument('-s','--save_graph', action='store_true', help='Save the graph to a file. Defaults to False')
    parser.add_argument('-v','--visualize', action='store_true', help='Visualize the graph. Defaults to False')
    
    
    args = parser.parse_args()
    G = create_graph(args.root_path, args.output_path)
    # visualize_graph(G)
    pyvis_net = networkx_to_pyvis(G)
    if args.visualize:
        pyvis_net.show('nodes.html')
    if args.save_graph:
        save_graph(G, os.path.join(args.output_path, 'graph.pkl'))



def save_graph(graph, filename):
    with open(filename, 'wb') as f:
        pickle.dump(graph, f)

# Save the graph to a file



if __name__ == "__main__":
    main()

