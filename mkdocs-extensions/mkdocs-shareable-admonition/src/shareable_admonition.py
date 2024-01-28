import os
import re
import markdown
from mkdocs.plugins import BasePlugin
from mkdocs.structure.files import File
import jinja2
import tempfile

class ShareableAdmonitionPlugin(BasePlugin):
    # RE = re.compile(r'(?:^|\n)!!! ?([\w\-]+) +([\w\-]+) +"(.*?)" *(?:\n|$)')
    RE = re.compile(r'(?:^|\n)(!!!|\?\?\?|\?\?\?\+)[ ]*([\w\-\+]+)[ ]+"([^"]+)"[ ]+([\w\-]+)(?:\n|$)')

    TEMPLATE_NAME = 'admonition_template.html'

    def __init__(self):
        self.template_env = jinja2.Environment(
            loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates'))
        )


    # def on_files(self, files, config):
    #     docs_dir = config['docs_dir']
    #     site_dir = config['site_dir']

    #     for file in files:
    #         if file.src_path.endswith('.md'):
    #             self.process_file(file, docs_dir, site_dir)

    def on_files(self, files, config):
        for file in files:
            if file.src_path.endswith('.md'):
                self.process_file(file, files, config)


    # def process_file(self, file, docs_dir, site_dir):
    #     with open(file.abs_src_path, 'r') as f:
    #         content = f.readlines()

    #     new_content = []
    #     admonition_block = []
    #     in_admonition = False
    #     share_name = None
    #     for line in content:    
    def process_file(self, file, files, config):
        if file.src_path.endswith('.temp.md'):
            return
        docs_dir = config['docs_dir']
        site_dir = config['site_dir']
        with open(file.abs_src_path, 'r') as f:
            content = f.readlines()

        new_content = []
        admonition_block = []
        in_admonition = False
        share_name = None


        for line in content:
            if self.RE.match(line):
                in_admonition = True
                admonition_type, tag, title, share_name = self.RE.match(line).groups()
                continue

            if in_admonition:
                if line.startswith('    '):  # Content of the admonition
                    admonition_block.append(line[4:])  # Remove indentation
                else:
                    in_admonition = False
                    # Process the extracted admonition block
                    admonition_html_path = os.path.join(site_dir, f'{share_name}.html')
                    # Create site_dir if it doesn't exist
                    if not os.path.exists(site_dir):
                        os.makedirs(site_dir)
                    self.create_admonition_html(admonition_html_path, ''.join(admonition_block), title, "Description", None, f'{share_name}.html', file.abs_src_path)
                    iframe_html = self.create_iframe(share_name)
                    new_content.append(iframe_html)
                    admonition_block = []
                    new_content.append(line)  # Include the current line as it's outside the admonition
            else:
                new_content.append(line)

        # Create a temporary markdown file
        temp_fd, temp_filepath = tempfile.mkstemp(suffix='.temp.md', dir=config['docs_dir'])
        # import ipdb; ipdb.set_trace()
        with os.fdopen(temp_fd, 'w') as temp_file:
            temp_file.writelines(new_content)

        # Calculate relative path for the temp file from docs_dir
        temp_rel_path = os.path.relpath(temp_filepath, config['docs_dir'])

        # Replace the original file in MkDocs files list
        temp_file_obj = File(path=temp_rel_path, src_dir=config['docs_dir'], dest_dir=config['site_dir'], use_directory_urls=config['use_directory_urls'])
        files.append(temp_file_obj)

        # Optionally, update navigation to point to the temporary file
        # ... (logic to update navigation)

        return temp_filepath
        # temp_fd, temp_filepath = tempfile.mkstemp(suffix='.md', dir=config['docs_dir'])
        # with os.fdopen(temp_fd, 'w') as temp_file:
        #     temp_file.writelines(new_content)

        # # Replace the original file in MkDocs files list
        # temp_file = File(path=temp_filepath, src_dir=file.src_dir, dest_dir=file.dest_dir, use_directory_urls=config['use_directory_urls'])
        # files.append(temp_file)
        
        # # # Update the markdown file
        # # with open(file.abs_src_path, 'w') as f:
        # #     f.writelines(new_content)
        # return temp_filepath

        
    def create_iframe(self, share_name):
        iframe_html = f'<iframe src="{share_name}.html" width="100%" height="300"></iframe>\n'
        return iframe_html



    def create_admonition_html(self, path, content, title, description, image_url, page_url, backlink_url):
        template = self.template_env.get_template(self.TEMPLATE_NAME)
        html_content = template.render(
            content=content,
            title=title,
            description=description,
            image_url=image_url,
            page_url=page_url,
            backlink_url=backlink_url
        )
        with open(path, 'w') as f:
            f.write(html_content)



    def create_share_button(self, share_name, title):
        return f'<button onclick="window.open(\'{share_name}.html\', \'_blank\')">{title}</button>\n'

    # Other necessary plugin methods...
