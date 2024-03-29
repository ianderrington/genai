import argparse
import os
import re

def replace_github_links_in_file(file_path):
    with open(file_path, 'r+', encoding='utf-8') as file:
        # content = file.read()
        # if not content.startswith('???') or not content.endswith('!!!'):
        ensure_starts_with = ['???', '!!!']
        github_link_pattern = r'\[([^\]]+)\]\(https://github\.com/([^/]+/[^/]+)\)'
        do_not_match = '![GitHub Repo stars]'
        # Go line by line ensure it starts with the expected strings
        # Ensure it doesn't have the do_not_match string
        # Replace any github links with the extended version
        def replacement(match):
            repo_name = match.group(2)
            repo_base= f'https://github.com/{repo_name}'
            # ensure do_not_match is not in the content
            if do_not_match not in content:
                return f'![GitHub Repo stars](https://badgen.net/github/stars/{repo_name})  [{match.group(1)}]' + f'({repo_base})'

   
        # readlines
        new_lines = []
        lines = file.readlines()
        for line in lines:
            if not line.startswith('???') or not line.endswith('!!!'):
                pass 
            elif do_not_match in line:
                pass 
            else:
                line = re.sub(github_link_pattern, replacement, line)
            new_lines.append(line)
        file.seek(0)
        file.write(''.join(new_lines))
        file.truncate()



     # updated_content = re.sub(github_link_pattern, replacement, content)
        # file.seek(0)
        # file.write(updated_content)
        # file.truncate()

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
