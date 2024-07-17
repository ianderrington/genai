import os

def create_project_structure(structure):
    """
    Creates a directory structure including files based on a structured multi-line string input.

    Args:
    structure (str): A string representing the directory structure.
    """
    lines = structure.split('\n')
    base_path = None

    for line in lines:
        if line.strip() == "":
            continue

        # Determine the depth by counting the number of leading spaces divided by 4 (standard indentation in markdown)
        depth = (len(line) - len(line.lstrip())) // 4

        # Clean the line to get only the relevant directory or file name
        clean_line = line.strip().split('#')[0].strip()
        if clean_line == "":
            continue

        # Determine if it is a directory or a file
        is_directory = clean_line.endswith('/')

        # Extract path elements
        path_elements = clean_line.strip('/').split('/')
        if not path_elements:
            continue

        # Join the path elements properly to form the full path
        if is_directory:
            # It's a directory
            directory = os.path.join(*path_elements)
            full_path = os.path.join(base_path if base_path else '', directory)
            if not os.path.exists(full_path):
                os.makedirs(full_path)
            if depth == 0:
                base_path = directory  # Setting base_path if it's the first directory at root level
        else:
            # It's a file
            filename = path_elements.pop()
            if path_elements:
                directory = os.path.join(*path_elements)
                full_path = os.path.join(base_path, directory)
                if not os.path.exists(full_path):
                    os.makedirs(full_path)
            else:
                full_path = base_path  # In case the file is at the root level of the base path
            # import ipdb; ipdb.set_trace()
            if full_path:
                file_path = os.path.join(full_path, filename)
            else:
                file_path = filename
            with open(file_path, 'w') as file:
                file.write("")  # Create an empty file

# Example usage
directory_structure = """
/your_project
│
├── /app                    # Application core
│   ├── __init__.py         # Initializes the Python app as a package
│   ├── /api                # API endpoints
│   │   ├── __init__.py
│   │   ├── /dependencies   # API dependencies (e.g., get current user, API keys)
│   │   │   └── __init__.py
│   │   └── /routes         # API route definitions
│   │       ├── __init__.py
│   │       └── /tool       # AI tool-specific routes
│   │           └── __init__.py
│   │
│   ├── /core               # Core application configuration and settings
│   │   ├── __init__.py
│   │   ├── config.py       # Configuration settings (API keys, database URI)
│   │   └── security.py     # Security configurations (OAuth, HTTPS setup)
│   │
│   ├── /models             # Database models
│   │   ├── __init__.py
│   │   └── models.py       # ORM models (e.g., tools, users, subscriptions)
│   │
│   ├── /schemas            # Pydantic schemas for request and response data
│   │   ├── __init__.py
│   │   └── schemas.py
│   │
│   ├── /services           # Business logic and service layer
│   │   ├── __init__.py
│   │   └── /subscription   # Subscription management services
│   │       └── __init__.py
│   │
│   └── /utils              # Utility functions and helpers
│       ├── __init__.py
│       └── utility.py
│
├── main.py                 # Entry point of the application
├── requirements.txt        # Project dependencies
└── Dockerfile              # Docker container specification
"""

create_project_structure(directory_structure)
