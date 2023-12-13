import sys
import re
import os
import json

def has_url(text):
    url_regex = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
    return re.search(url_regex, text) is not None

def find_keywords(directory, keywords):
    matches = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    file_content = f.read()
                    for keyword in keywords:
                        if keyword in file_content:
                            matches.append(file)
                            print(f"Match found in {file_path} for keyword '{keyword}'")
            except UnicodeDecodeError:
                pass
                ##print(f"Skipping non-text or non-UTF-8 encoded file: {file_path}")
            except Exception as e:
                print(f"Error reading file {file_path}: {e}")
    return matches


def main(issue_number, issue_text, directory):
    keywords = ["example_keyword_1", "example_keyword_2"]  # Define your keywords here
    label = "Human Insight Required"

    if has_url(issue_text):
        label = "URL present"
    else:
        keyword_matches = find_keywords(directory, keywords)
        if keyword_matches:
            label = "'To Be Included'"

    # Output for GitHub Actions
    # print(f"::set-output name=label::{label}")
    # run: echo "{name}={value}" >> $GITHUB_STATE
    # must use the format above instead of set-output
    
    print(f"run: echo \"label={label}\" >> $GITHUB_STATE")
    

if __name__ == "__main__":
    issue_number = sys.argv[1]
    issue_text = sys.argv[2]
    search_directory = '.'  # Set the directory for keyword search
    main(issue_number, issue_text, search_directory)

