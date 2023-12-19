from genai.interactions.github.evaluate_issue import main

import os
import re
import requests

class ResourceProcessor:
    """
    Class to handle the processing of different types of resources.
    """
    
    def __init__(self, db_connection):
        self.db_connection = db_connection  # Database connection object

    def extract_html_links(self, issue_body):
        """
        Extract HTML links from genai.interactions.github.evaluate_issue import main

if __name__ == "__main__":
    issue_number = sys.argv[1]
    issue_text = sys.argv[2]
    search_directory = "."  # Set the directory for keyword search
    main(issue_number, issue_text, search_directory)