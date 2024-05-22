import argparse
import os
import re

import re

def replace_github_links_in_file(file_path):

    # Here is an example... 
    #[Enhancing LLMs with Semantic-layers]([Enhancing LLMs with Semantic-layers](https://github.com/tomasonjo/llm-movieagent))
    # This  should be just [Enhancing LLMs with Semantic-layers](https://github.com/tomasonjo/llm-movieagent)
    github_link_pattern = r'\[([^\]]+)\]\(\[([^\]]+)\]\((https://github\.com/[^/]+/[^/]+)\)\)'
    do_not_match = '![GitHub Repo stars]'
    # Replacement function that checks if do_not_match is in the matched string
    def replacement(match):
        if do_not_match in match.group(0):
            return match.group(0)
        return f'[{match.group(1)}]({match.group(3)})'
        

    with open(file_path, 'r+', encoding='utf-8') as file:
        lines = file.readlines()
        new_lines = []
        for line in lines:
            # Apply the replacement function to each line
            new_line = re.sub(github_link_pattern, replacement, line)
            new_lines.append(new_line)
        
        # Go back to the start of the file and write the new content
        file.seek(0)
        file.writelines(new_lines)  # Use writelines to maintain original line endings
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
