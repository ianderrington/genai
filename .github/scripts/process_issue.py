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
        Extract HTML links from the issue body.
        """
        # regex to extract links...
        # need to remove all things like this
        # ?utm_source=tldrai
        regex = r"(?P<url>https?://[^\s]+)" 
        matches = re.finditer(regex, issue_body, re.MULTILINE)
        links = []
        for match in matches:
            links.append(match.group('url'))
        return links

    def determine_link_type(self, link):
        """
        Determine the type of the link.
        """
        if 'github.com' in link:
            return 'github'
        elif 'arxiv.org' in link:
            return 'arxiv'
        else:
            return 'html'

    def process_link(self, link):
        """
        Process the link based on its type.
        """
        link_type = self.determine_link_type(link)
        if link_type == 'github':
            return self.process_github_link(link)
        elif link_type == 'arxiv':
            return self.process_arxiv_link(link)
        else:
            return self.process_html_link(link)

    def process_github_link(self, link):
        """
        Process a GitHub repository link.
        """
        # If the the cloned repo is already in the database, it will return None
        # This will clone the repository into the cloned subrepo. 
        # It will be added to a node in the KG, with the relative path to the root of the repo
        # Next, it will be processed to extract the README.md file and the KG will be added there
        # Next, it will be processed to extract the LICENSE file and the KG will be added there
        # It will return the KG node for the repo

    def process_arxiv_link(self, link):
        """
        Process an Arxiv link.
        """
        # This will change the link to the PDF version
        # of the paper. So it will translate the link if it is 
        # https://arxiv.org/abs/2311.16452 it will become
        # https://arxiv.org/pdf/2311.16452.pdf
        # Next it will downloaded to the database.
        # Next, the images will be extracted from the pdf and saved in a KG node
        # Next the pdf will be processed to extract the text in as a KG node with a schema that 
        # includes Title, Authors, Abstract, Body, References, and pointers Image nodes
        # It will return the KG node for the paper 

    def process_html_link(self, link):
        """
        Process an HTML link.
        """
        # This will download the HTML page to the database.
        # Next, any images will be extracted from the HTML and saved in a KG node with only an address
        # It will return the KG node for the HTML page 
                       

class KnowledgeGraph:
    """
    Class to handle interactions with a knowledge graph.
    """

    def __init__(self, db_connection, llm_connection):
        self.db_connection = db_connection  # Database connection object
        self.llm_connection = llm_connection  # Large Language Model connection object

    def add_resource_to_graph(self, resource_id):
        """
        Add a processed resource to the knowledge graph.
        """
        # Different recourse types will have different schemas and will need to be processed differently. 

    def update_graph_structure(self):
        """
        Update the structure of the knowledge graph based on new resources.
        """
        # Implementation...

    # Other knowledge graph methods...


class Documentation:
    """
    This class will update the documentation repo based on the updates. 
    The documentation will have a vector representation of the components. 
    
    
    """

    def __init__(self, database_connection):
        self.db_connection = db_connection  # Database connection object

    def update(self, updates):
        """
        Update the documentation based on the updates to the knowledge graph.
        """
        # Implementation...

# class Documentation:
#     def __init__(self, kg, mkdocs_directory):
#         self.kg = kg
#         self.mkdocs_directory = mkdocs_directory

#     def update_documentation(self):
#         for node in self.kg.nodes:
#             self.update_or_create_markdown(node)

#     def update_or_create_markdown(self, node):
#         filepath = self.get_markdown_path(node)
#         content = self.generate_markdown_content(node)
        
#         with open(filepath, 'w') as file:
#             file.write(content)

#     def get_markdown_path(self, node):
#         # Convert node attributes to a file path
#         # Example: title -> docs/title.md
#         title = node.get('title').replace(' ', '_').lower()
#         return os.path.join(self.mkdocs_directory, f'{title}.md')

#     def generate_markdown_content(self, node):
#         # Generate Markdown content from node attributes
#         content = markdown2.markdown(node.get('description'))
#         for reference in node.get('references', []):
#             content += f"\n- [Reference]({reference})"
#         return content

# class KGNode:
#     # Example node class for the KG
#     def __init__(self, title, description, references=[]):
#         self.title = title
#         self.description = description
#         self.references = references

#     def get(self, attribute):
#         return getattr(self, attribute, '')

# # Example usage
# if __name__ == "__main__":
#     # Example KG Nodes
#     node1 = KGNode("AI Basics", "Description of AI Basics", ["https://example.com"])
#     node2 = KGNode("Machine Learning", "Description of Machine Learning", ["https://example2.com"])

#     # Example KG
#     kg = KnowledgeGraph()
#     kg.nodes = [node1, node2]

#     documentation = Documentation(kg, "path/to/mkdocs")
#     documentation.update_documentation()

class ProcessIssuePipeline:
    """
    Pipeline to process GitHub issues.
    """

    def __init__(self, db_connection):
        self.processor = ResourceProcessor(db_connection)
        self.graph = KnowledgeGraph(db_connection)
        self.documentation = Documentation(db_connection)

    def run(self, issue_body):
        """
        Run the pipeline to process the issue.
        """
        links = self.extract_links_stage(issue_body)
        # new_links = self.resource_check_stage(links)
        processed_resources = self.link_processing_stage(links)
        self.knowledge_graph_integration_stage(processed_resources)

    def extract_links_stage(self, issue_body):
        """
        Stage 1: Extract links from the issue.
        """
        return self.processor.extract_html_links(issue_body)

    def link_processing_stage(self, links):
        """
        Stage 3: Process each new link.
        """
        processed_results = [self.processor.process_link(link) for link in links]
        return [result for result in processed_results if result is not None]

    def knowledge_graph_integration_stage(self, resources):
        """ 
        Stage 4: Integrate new resources into the knowledge graph.
        """
        for resource in resources:
            self.graph.add_resource_to_graph(resource)
        updates = self.graph.update_graph_structure()
        self.documentation.update(updates)

    def update_documentation(self, updates):
        """
        Update the documentation based on the updates to the knowledge graph.
        """
        # 


# Example usage
if __name__ == "__main__":
    issue_body = "Issue content with HTML links..."
    db_connection = "Database connection object or configuration"
    pipeline = ProcessIssuePipeline(db_connection)
    pipeline.run(issue_body)
