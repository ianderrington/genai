import argparse
import os
import re

def replace_github_links_in_file(file_path):
    with open(file_path, 'r+', encoding='utf-8') as file:
        content = file.read()
        github_link_pattern = r'\[([^\]]+)\]\(https://github\.com/([^/]+/[^/]+)\)'
        
        def replacement(match):
            repo_name = match.group(2)
            return f'[GitHub Repo stars](https://badgen.net/github/stars/{repo_name})  [{match.group(1)}](https://github.com/{repo_name})'

        updated_content = re.sub(github_link_pattern, replacement, content)
        file.seek(0)
        file.write(updated_content)
        file.truncate()

def crawl_directory_and_replace_links(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                replace_github_links_in_file(os.path.join(root, file))

def main():
    parser = argparse.ArgumentParser(description="Replace GitHub repo links with extended versions including stars.")
    parser.add_argument("directory", type=str, help="The directory to crawl for Markdown files.")
    
    args = parser.parse_args()
    crawl_directory_and_replace_links(args.directory)

    print("Replacement complete.")

if __name__ == "__main__":
    main()
