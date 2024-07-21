from setuptools import setup, find_packages

with open("requirements.txt", "r") as file:
    requirements = file.read().splitlines()

setup(
    name="mana_guide",  # The name of your package
    version="0.1",  # The initial release version
    packages=find_packages(exclude=['tests', 'docs', 'cloned', 'lib', 'downloads', 'mkdocs-extensions', 'site']),  # Searches for Python packages in the current directory
    install_requires=requirements,  # List of dependencies read from requirements.txt
    url="",  # The URL of your package's home page (update with your URL)
    author="Ian Derrington",  # Your name
    author_email="Ian.Derrington@gmail.com",  
    description="Mana Guide provides the way to use GenAI agents and teams to help people to solve problems",
    entry_points={
        "console_scripts": [
            "mana_rag_compare = mana_guide.components.evaluation.rag_retrieval_ragas:main",
            "mana_chat = mana_guide.gui.entry_point:main",

        ]
    },
    
)

