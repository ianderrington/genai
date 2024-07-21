"""
This script is used to crawl directories and document files in Markdown format.
It is useful for collapsing directories and files into a single markdown document that can be
fed into an LLM to suggest modifications more holistically.
"""

import os
import argparse

def get_file_content(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as file:
            return file.read()
    except Exception as e:
        return f"Error reading file: {e}"

def crawl_directory(directory, file_types, ignores=None):
    if ignores is None:
        ignores = []    
    markdown_content = ""
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in ignores]
        depth = root[len(directory):].count(os.sep)
        indent = '#' * depth + '#'
        relative_path = os.path.relpath(root, directory)
        markdown_content += f"{indent} {relative_path}\n"
        
        for file in files:
            if file in ignores:
                continue
            if any(file.endswith(ft) for ft in file_types):
                filepath = os.path.join(root, file)
                content = get_file_content(filepath)
                markdown_content += f"`{file}`\n"
                markdown_content += f"```{file.split('.')[-1]}\n{content}\n```\n"
    return markdown_content

def main():
    parser = argparse.ArgumentParser(description="Crawl directories and document files in Markdown format.")
    parser.add_argument("-o", "--output", help="Output markdown file")
    parser.add_argument("-d", "--directory", help="Directory to crawl")
    parser.add_argument("--tree", action="store_true", help="Include directory tree in markdown document")
    parser.add_argument("-t", "--types", nargs='+', default=["py", "js", "ts", "tsx", "css"], 
                        help="File types to include in the markdown document")
    ## add ignores common .gitignore files including node_modules dist, package-lock.json, yarn.lock
    parser.add_argument("-i", "--ignore", nargs='+', default=["node_modules", "dist", "package-lock.json", "yarn.lock"], 
                        help="Directories or files to ignore")

    args = parser.parse_args()
    # Prevent recursive generation by adding this ignore, just in case 'md' is in the types
    ignore = args.ignore + [args.output]
    markdown_content = crawl_directory(args.directory, args.types, args.ignore)
    if args.tree:
        # run a bash tree command and capture the output
        from genai.tools.dir_utils import get_tree_structure
        tree_content = get_tree_structure(args.directory)
        markdown_content = f"{tree_content}\n{markdown_content}"
        
    with open(args.output, 'w', encoding='utf-8') as md_file:
        md_file.write(markdown_content)

if __name__ == "__main__":
    main()
