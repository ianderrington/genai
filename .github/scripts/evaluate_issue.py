from genai.interactions.github.evaluate_issue import main

if __name__ == "__main__":
    issue_number = sys.argv[1]
    issue_text = sys.argv[2]
    search_directory = "."  # Set the directory for keyword search
    main(issue_number, issue_text, search_directory)
