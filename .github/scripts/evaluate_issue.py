# from genai.interactions.github.evaluate_issue import main
import sys
import re
import os
import json


# def has_url(text):
#     url_regex = r"http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+"

#     return re.search(url_regex, text.lower()) is not None

def extract_urls(text):
    url_regex = r"http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+"
    urls = re.findall(url_regex, text)
    return urls

def find_keywords(directory, keywords):
    matches = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    file_content = f.read()
                    for keyword in keywords:
                        if keyword in file_content:
                            matches.append(file)
                            # print(f"Match found in {file_path} for keyword '{keyword}'")
            except UnicodeDecodeError:
                pass
                ##print(f"Skipping non-text or non-UTF-8 encoded file: {file_path}")
            except Exception as e:
                pass
                # print(f"Error reading file {file_path}: {e}")
    return matches

def clean_urls(url_list):
    # go through url list
    # strip http:// and https:// if present
    # remove all queries at end that resemble the pattern ?utm_source=substack&utm_medium=email or ?utm_source=tldrai etc...

    clean_urls = []
    for url in url_list:
        # url = url.replace("https://", "").replace("http://", "")
        # remove query string from url
        url = re.sub(r"\?.*", "", url)
        clean_urls.append(url)

    return clean_urls


def main(issue_number, issue_text, directory):
    keywords = ["includeindocs"]  # Define your keywords here
    label = "HumanInsightRequired"

    urls = extract_urls(issue_text)
    urls = clean_urls(urls)
    # print(f"urls={urls}")
    label = "HumanInsightRequired"
    body = ""
    if urls: 
        label = "IncludeInDocs"
        matches = find_keywords(directory, urls)
        if len(urls)==len(matches):
            label = "All URLs Present"
            
        else:
            missing_urls = list(set(urls) - set(matches))
            body = f"MANAGEN, please consider and add the following issues to your :\n"
            body += '\n'.join(missing_urls)
            # print(f"matches={matches}")
    # Output for GitHub Actions

    # python {output} "{name}={value}" >> $GITHUB_STATE
    # https://github.blog/changelog/2022-10-11-github-actions-deprecating-save-state-and-set-output-commands/
    # must use the format above instead of set-output

    # print(f"echo \"label='{label}'\" >> \"$GITHUB_OUTPUT\"")
    print(f"label={label}")
    if body:
        print(f'body="{body}"')


if __name__ == "__main__":
    issue_number = sys.argv[1]
    issue_text = sys.argv[2]
    search_directory = "docs"  # Set the directory for keyword search
    main(issue_number, issue_text, search_directory)
