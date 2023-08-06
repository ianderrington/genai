import os
import requests
import networkx as nx
import markdown
import matplotlib.pyplot as plt
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import argparse
import pickle
import git
from pyvis.network import Network
from git.exc import GitCommandError


def extract_documents(root_path):
    """Walk through the directory and extract all documents"""
    for root, dirs, files in os.walk(root_path):
        for file in files:
            if file.endswith('.md') or file.endswith('.py') or file == '.pages':
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



def clone_github(url, save_path, reclone=False):
    # Repo.clone_from(url, save_path)
    if os.path.exists(save_path) and not reclone:
        print(f"repo {url} already exists")
        return
    
    if not os.path.exists(save_path):
        os.makedirs(save_path)

    assert url.startswith('git@github.com:')
    branches = ['master', 'main']
    for branch in branches:
        try:
            repo = git.Repo.clone_from(url,
                            save_path,
                            branch=branch)
            break
        except GitCommandError:
            print(f"branch {branch} not found")
            continue



def save_content(url, save_path, overwrite=False, reclone=False):
    """Save the content of an endpoint to a local file"""
    if not url:
        return

    if os.path.exists(save_path) and 'github' not in url and not overwrite:
        print(f"url {url} and file {save_path} already exists")
        return

    url = remap_url(url)
    
    if 'github' not in url:
        response = requests.get(url)
        with open(save_path, 'wb') as out_file:
            print(f"saving {url} to {save_path}")
            out_file.write(response.content)
    else:
        clone_github(url, save_path, reclone=False)



def is_local_file(link):
    """Check if the link is a local file or an endpoint""" 
    return bool(urlparse(link).netloc)


def create_graph(root_path, output_path, download_content=False):
    """Create a network graph of files and links"""
    G = nx.DiGraph()
    if not os.path.exists(output_path):
        os.makedirs(output_path) 

    for doc in extract_documents(root_path):
        G.add_node(doc)
        for link in parse_markdown(doc):
            print(f"doc: {doc} link: {link}")
            if not is_local_file(link):
                local_path = make_local_path(output_path, link)
                print(f"doc: {doc} link: {link} local_path: {local_path}")
                if download_content:
                    save_content(link, local_path) 
                
                G.add_edge({'doc':doc, 'type': 'local'}, local_path)
                
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
        
        if len(link) < 3:
            link = ''.join(link)
            output_path = os.path.join(output_path, link)
        elif 'http' in link: 
            # if the link is an http style url then extract the path from the url
            _, originator, link, *rest = link
            link = link[2]
            output_path = os.path.join(output_path, originator, link)
        elif link.startswith('git@github.com'):
            link = link.replace('git@github.com:', '').replace('.git', '')
            print(link)
            output_path = os.path.join( output_path, 'github',link)

        return output_path


def make_link_name(link):
    """It creates a os-safe filename based on the input link"""
    return link.replace('/', '_').replace(':', '_').replace('?', '_').replace('=', '_').replace('&', '_').replace('-', '_').replace(' ', '_')


def find_link_suffix(link):
    """ if the path has no .html we append it """
    if not link.endswith('.html') and not link.endswith('.pdf') and \
        not link.endswith('.md') and not 'github' in link:
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
    


def networkx_to_pyvis(nx_graph,notebook=False):
    """Transform a networkx graph into a dtpyvis network"""
    pyvis_net = Network(notebook=notebook)

    for node, node_attrs in nx_graph.nodes(data=True):
        pyvis_net.add_node(node, **node_attrs)

    for source, target, edge_attrs in nx_graph.edges(data=True):
        # assuming edge_attrs is a dictionary of attributes
        pyvis_net.add_edge(source, target, **edge_attrs)

    return pyvis_net


def save_graph(graph, filename):
    print(f"Saving graph to {filename}")
    with open(filename, 'wb') as f:
        pickle.dump(graph, f)

def check_args(args):
    # if load graph or save graph are provided, then graph_filename must be provided
    if args.load_graph or args.save_graph:
        assert args.graph_filename, "graph_filename must be provided if load_graph or save_graph are provided"
    # if graph_filename is provided but load_graph or save_graph are not provided, then raise an warning
    if args.graph_filename:
        print(f'Warning: graph_filename provided but load_graph or save_graph are not provided. graph_filename will be ignored')

def main():
    parser = argparse.ArgumentParser(description='Build a network graph from mkdocs repository.')
    # Add exclusive optional argument group for `save_graph` and `load_graph` arguments
    
    parser.add_argument('-r', '--root_path', default='', type=str, help='Path to the root of the mkdocs repository.')
    parser.add_argument('-g', '--graph_filename', type=str, help='Filename to save the graph to. Defaults to None')
    group = parser.add_mutually_exclusive_group()
  
    group.add_argument('-l', '--load_graph', action='store_true', help='Load a graph from a file. Defaults to False')
    group.add_argument('-s', '--save_graph', action='store_true', help='Save the graph to a file. Defaults to False')

    parser.add_argument('--output_path', type=str, default='./output', help='Path to save the output files. Defaults to ./output')
    
    parser.add_argument('-v','--visualize', action='store_true', help='Visualize the graph. Defaults to False')
    parser.add_argument('-d','--download_content', action='store_true', help='Download the content of the links. Defaults to False')
    
    parser.add_argument('-n', '--in_notebook', action='store_true', help='Run the script in a notebook. Defaults to False')
    # TODO: Detect if it is a jupyter notebook calling
    

    args = parser.parse_args()
    check_args(args)
    if args.load_graph:
        G = pickle.load(open(args.load_graph, 'rb'))
    elif args.root_path:
        G = create_graph(args.root_path, args.output_path, args.download_content)
    else:
        raise ValueError("Either root_path or load_graph must be provided")
    
    # visualize_graph(G)
    print("Finishing up") 
    # import ipdb; ipdb.set_trace()
    pyvis_net = networkx_to_pyvis(G)
    if args.visualize:
        pyvis_net.show(os.path.join(args.output_path,'nodes.html'), notebook=args.in_notebook)
    if args.graph_filename:
        save_graph(G, os.path.join(args.output_path, args.graph_filename + '.pkl'))





if __name__ == "__main__":
    main()

