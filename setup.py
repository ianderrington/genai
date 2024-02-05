from setuptools import setup, find_packages

# Load the requirements from the text file.
with open("requirements.txt", "r") as file:
    requirements = file.read().splitlines()

setup(
    name="genai",  # The name of your package
    version="0.1",  # The initial release version
    packages=find_packages('genai'),  # Searches for Python packages in the current directory
    install_requires=requirements,  # List of dependencies read from requirements.txt
    url="https://github.com/username/genai",  # The URL of your package's home page (update with your URL)
    author="Ian Derrington",  # Your name
    author_email="Ian.Derrington@gmail.com",  
    description="Genai, supports the Managen protocal for enabling people to work in aligned collaboration with AI.",
)
