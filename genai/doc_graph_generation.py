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
import yaml

from utils.hash import KeyDict


# def extract_documents(root_path):
#     """Walk through the directory and extract all documents"""
#     for root, dirs, files in os.walk(root_path):
#         # # yield a directory if there is a markdown file in it
#         # # and there is no .pages file in it
#         # if any(file.endswith(".md") for file in files) and not os.path.exists(os.path.join(root, ".pages")):
#         #     # add a dummy .pages file
#         #     yield os.path.join(root, ".pages")
#         # for file in files:
#         #     if file.endswith(".md") or file.endswith(".py"):# or file == ".pages":
#         #         yield os.path.join(root, file)
#         if ".pages" not in files:
#             yield os.path.join(root, ".pages")
            


def parse_markdown(file_path):
    """Parse markdown file and extract links"""
    with open(file_path, "r") as f:
        md = markdown.markdown(f.read())
        soup = BeautifulSoup(md, features="html.parser")
        for link in soup.find_all("a"):
            yield link.get("href")


def remap_url(url):
    # If it is an http link, then we need to change it to https
    if url.startswith("http://"):
        url = url.replace("http://", "https://")
    # If it is an arxiv paper but not pointing to the direct pdf, then we need to change the url to contain the pdf
    # Example: url = https://arxiv.org/abs/2203.15556 --> https://arxiv.org/pdf/2203.15556.pdf
    if url.startswith("https://arxiv.org/abs/") and not url.endswith(".pdf"):
        url = url.replace("https://arxiv.org/abs/", "https://arxiv.org/pdf/") + ".pdf"
    url.replace(".pdf.pdf", ".pdf")
    return url


def clone_github(url, save_path, reclone=False):
    # Repo.clone_from(url, save_path)
    if os.path.exists(save_path) and not reclone:
        print(f"repo {url} already exists")
        return

    if not os.path.exists(save_path):
        os.makedirs(save_path)

    assert url.startswith("git@github.com:")
    branches = ["master", "main"]
    for branch in branches:
        try:
            repo = git.Repo.clone_from(url, save_path, branch=branch)
            break
        except GitCommandError:
            print(f"branch {branch} not found")
            continue


def save_content(url, save_path, overwrite=False, reclone=False):
    """Save the content of an endpoint to a local file"""
    if not url:
        return

    if os.path.exists(save_path) and "github" not in url and not overwrite:
        print(f"url {url} and file {save_path} already exists")
        return

    url = remap_url(url)

    if "github" not in url:
        with open(save_path, "wb") as out_file:
            print(f"saving {url} to {save_path}")
            out_file.write(response.content)
    else:
        clone_github(url, save_path, reclone=False)


def is_local_file(link):
    """Check if the link is a local file or an endpoint"""
    return os.path.exists(link)


def create_documention_graph(root_path, output_path, download_content=False):
    G = nx.DiGraph()

    for root, dirs, files in os.walk(root_path):
        if root not in G and not (root.endswith('assets') or root.endswith('stylesheets')):
            G.add_node(root, type='folder')
        # add directory links
        for dirv in dirs:
            if dirv.endswith('stylesheets') or dirv.endswith('assets'):
                continue
            dir_path = os.path.join(root, dirv)
            G.add_node(dir_path, type='folder')
            G.add_edge(root, dir_path)
        for file in files:
            file_path = os.path.join(root, file)
            # if  file.endswith('index.md'):
            #     continue
                # G.add_node(file_path, type='index')
                # G.add_edge(root, file_path)
            if file.endswith('.md') :
                G.add_node(file_path, type='local')
                G.add_edge(root, file_path)
                for link in parse_markdown(file_path):
                    if '#' in link:
                        continue
                    if link.endswith('.md') and not (link.startswith('http') or 'github' in link):
                        link = os.path.normpath(os.path.join(os.path.dirname(file_path), link))
                    # location_type = "local" if is_local_file(link) else "non-local"
                    location_type = 'non-local'
                    if is_local_file(link):
                        location_type = 'local'
                    elif 'github' in link:
                        location_type = 'github'
                    elif 'pdf' in link:
                        location_type = 'pdf'
                    
                        # link = os.path.normpath(link)
                    G.add_node(link, type=location_type)
                    G.add_edge(file_path, link)#, content=content) 
            elif file == '.pages':
                check_dir_and_pages_file(root, file)

            else:
                pass

    return G


def check_dir_and_pages_file(root, file):
    """ make sure the .pages covers all .md in the directory """
    assert file == '.pages'
    pages_file = os.path.join(root, file)

    with open(pages_file, 'r') as f:
        pages = yaml.safe_load(f)
    
    covered = False
    if '...' in pages['nav']:
        covered = True
        return 
    
    all_contents = os.listdir(root)
    all_contents = [item for item in all_contents if item.endswith('.md') or os.path.isdir(item)]
    pages_contents = pages['nav']
    pages_contents = [item if isinstance(item, str) else list(item.values())[0] for item in pages_contents]


    # import ipdb; ipdb.set_trace()
    covered = set(all_contents) == set(pages_contents)

    if not covered:
        print(f"Warning: {root} does not have a .pages file that covers all .md files in the directory")
        # list the contents and differences
        print(f"all_contents: \n{all_contents}")
        print(f"pages_contents: \n{pages_contents}")


def make_local_path(output_path, link):
    """
    Makes a local path from a link.
    """

    if "github" not in link:
        file_suffix = find_link_suffix(link)
        link_name = make_link_name(link + file_suffix)
        return os.path.join(output_path, link_name)
    # return os.path.join(output_path, link_name + file_suffix
    else:

        if len(link) < 3:
            link = "".join(link)
            output_path = os.path.join(output_path, link)
        elif "http" in link:
            # if the link is an http style url then extract the path from the url
            _, originator, link, *rest = link
            link = link[2]
            output_path = os.path.join(output_path, originator, link)
        elif link.startswith("git@github.com"):
            link = link.replace("git@github.com:", "").replace(".git", "")
            print(link)
            output_path = os.path.join(output_path, "github", link)

        return output_path



def make_link_name(link, download_content=False):
    """It creates a os-safe filename based on the input link
    It also appends a content-based suffix from a hash of the link content if download_content is True
    otherwise it will return the link name as is.
    It wll put the file in an output directory based on the link type.

    """
    
    # If it is a file it only returns the filename and not the dir
    # 
    # return (
    #     link.replace("/", "_")
    #     .replace(":", "_")
    #     .replace("?", "_")
    #     .replace("=", "_")
    #     .replace("&", "_")
    #     .replace("-", "_")
    #     .replace(" ", "_")
    # )


def find_link_suffix(link):
    """if the path has no .html we append it"""
    if (
        not link.endswith(".html")
        and not link.endswith(".pdf")
        and not link.endswith(".md")
        and not "github" in link
    ):
        return ".html"
    else:
        return ""


def visualize_graph(G):
    """Visualize the network graph"""
    # pos = nx.spring_layout(G)
    
    nx.draw(G, pos, with_labels=False)
    plt.show()


def networkx_to_pyvis(nx_graph, notebook=False):
    """Transform a networkx graph into a dtpyvis network"""
    pyvis_net = Network(notebook=notebook)
    color_map = {'local': 'blue', 
                'folder': 'red', 
                'non-local': 'green',
                'github': 'orange',
                'pdf': 'purple'
                }
    # shape_map = {'local': 'circle', 'folder': 'box', 'non-local': 'box'}
    for node, node_attrs in nx_graph.nodes(data=True):

        color = color_map.get(node_attrs.get('type', ''), 'black')
        # shape = shape_map.get(node_attrs.get('type', ''), 'box')
        # if node_attrs.get('type', '') == 'non-local':
        #     return
            # pyvis_net.add_node(node, color=color, shape='box')
        # if color != 'black':
        #     # pyvis_net.add_node(node, color=color, shape='box')
        #     # pyvis_net.add_node(node, color=color, shape=shape)
        pyvis_net.add_node(node, color=color)

    for source, target, edge_attrs in nx_graph.edges(data=True):

        pyvis_net.add_edge(source, target, **edge_attrs)

    return pyvis_net


def save_graph(graph, filename):
    print(f"Saving graph to {filename}")
    with open(filename, "wb") as f:
        pickle.dump(graph, f)


def check_args(args):
    # if load graph or save graph are provided, then graph_filename must be provided
    if args.load_graph or args.save_graph:
        assert (
            args.graph_filename
        ), "graph_filename must be provided if load_graph or save_graph are provided"
    # if graph_filename is provided but load_graph or save_graph are not provided, then raise an warning
    if args.graph_filename and not (args.load_graph or args.save_graph):
        print(
            f"Warning: graph_filename provided but load_graph or save_graph are not provided. graph_filename will be ignored"
        )

def resize_html_graph(file_path, width='100%', height='1000px'):
    with open(file_path, 'r+') as f:
        soup = BeautifulSoup(f, 'html.parser')

        network_div = soup.find('div', id='mynetwork')
        network_div['style'] = f'width: {width}; height: {height};'

        f.seek(0)
        f.write(str(soup))
        f.truncate()

def main():
    parser = argparse.ArgumentParser(
        description="Build a network graph from mkdocs repository."
    )
    # Add exclusive optional argument group for `save_graph` and `load_graph` arguments

    parser.add_argument(
        "-r",
        "--root_path",
        default="",
        type=str,
        help="Path to the root of the mkdocs repository.",
    )
    parser.add_argument(
        "-g",
        "--graph_filename",
        type=str,
        help="Filename to save the graph to. Defaults to None",
    )
    group = parser.add_mutually_exclusive_group()

    group.add_argument(
        "-l",
        "--load_graph",
        action="store_true",
        help="Load a graph from a file. Defaults to False",
    )
    group.add_argument(
        "-s",
        "--save_graph",
        action="store_true",
        help="Save the graph to a file. Defaults to False",
    )

    parser.add_argument(
        "--output_path",
        type=str,
        default="./output",
        help="Path to save the output files. Defaults to ./output",
    )

    parser.add_argument(
        "-v",
        "--visualize",
        action="store_true",
        help="Visualize the graph. Defaults to False",
    )
    parser.add_argument(
        "-d",
        "--download_content",
        action="store_true",
        help="Download the content of the links. Defaults to False",
    )

    parser.add_argument(
        "-n",
        "--in_notebook",
        action="store_true",
        help="Run the script in a notebook. Defaults to False",
    )
    # TODO: Detect if it is a jupyter notebook calling

    args = parser.parse_args()
    check_args(args)
    if args.load_graph:
        G = pickle.load(open(args.load_graph, "rb"))
    elif args.root_path:
        G = create_documention_graph(args.root_path, args.output_path, args.download_content)
    else:
        raise ValueError("Either root_path or load_graph must be provided")

    # visualize_graph(G)
    print("Finishing up")
    # import ipdb; ipdb.set_trace()
    pyvis_net = networkx_to_pyvis(G)
    if args.visualize:
        pyvis_net.show(
            os.path.join(args.output_path, "nodes.html"), notebook=args.in_notebook
        )
        resize_html_graph(os.path.join(args.output_path, "nodes.html"))
    if args.graph_filename:
        save_graph(G, os.path.join(args.output_path, args.graph_filename + ".pkl"))


if __name__ == "__main__":
    main()

# IDEA: This needs to have a document class that will allow url to map to it so it can be processed in a pipeline run with a similar syntax. 
# This requires there be an abstract document class that can be extended to different types of documents. 
# It would have the following subtypes: html, (arxive(html or pdf)), pdf, markdown, github, local file, (local markdown),  etc.
# This would also have a method to combine KG schema with the document schema. 
# These schemas would be used to create a graph of the documents, and their relationships. 

# The document processor would take a link, scan it for the type of document, and then process it accordingly based on that document type.
# The processor would also have a method to create a graph of the documents, and their relationships.