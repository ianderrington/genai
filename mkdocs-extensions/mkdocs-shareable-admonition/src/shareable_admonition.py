import os
import re
import markdown
import mkdocs
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

    def on_files(self, files, config):
        for file in files:
            if file.src_path.endswith('.md'):
                self.process_file(file, files, config)

    def process_file(self, file, files, config):
        if file.src_path.endswith('.temp.md'):
            return
        docs_dir = config['docs_dir']
        site_dir = config['site_dir']
        out_dir = file.url
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
                    # admonition_html_path = os.path.join(site_dir, f'{share_name}.html')
                    admonition_html_path = os.path.join(out_dir, f'{share_name}.html')

                    # Create site_dir if it doesn't exist
                    if not os.path.exists(admonition_html_path):
                        os.makedirs(admonition_html_path)
                    admonition_block = markdown.markdown(''.join(admonition_block), extensions=config['markdown_extensions']) 
                    self.create_admonition_html(admonition_html_path,
                        admonition_block, 
                        title, 
                        "Description", None, 
                        page_url = f'{share_name}.html', 
                        backlink_url=file.abs_src_path
                    )
                    iframe_html = self.create_iframe(share_name)
                    new_content.append(iframe_html)
                    admonition_block = []
                    new_content.append(line)  # Include the current line as it's outside the admonition
            else:
                new_content.append(line)
        import ipdb; ipdb.set_trace()

        # Create a temporary markdown file
        temp_fd, temp_filepath = tempfile.mkstemp(suffix='.temp.md', dir=config['docs_dir'])

        
        with os.fdopen(temp_fd, 'w') as temp_file:
            temp_file.writelines(new_content)

        # Calculate relative path for the temp file from docs_dir
        temp_rel_path = os.path.relpath(temp_filepath, config['docs_dir'])

        # Replace the original file in MkDocs files list
        temp_file_obj = File(path=temp_rel_path, src_dir=config['docs_dir'], dest_dir=config['site_dir'], use_directory_urls=config['use_directory_urls'])
        files.append(temp_file_obj)

        import ipdb; ipdb.set_trace()
        # Optionally, update navigation to point to the temporary file
        # ... (logic to update navigation)

        return temp_filepath


    # def on_nav(self, nav, config, files):
    #     temp_files_map = self.create_temp_files_map(files)
    #     self.update_nav(nav, temp_files_map)

    # def create_temp_files_map(self, files):
    #     # Mapping of original file paths to temporary file paths
    #     temp_files_map = {}
    #     for file in files:
    #         if file.abs_src_path.endswith('.tmp.md'):  # Assuming temporary files end with '.tmp.md'
    #             original_path = file.abs_src_path.replace('.tmp.md', '.md')
    #             temp_files_map[original_path] = file.abs_src_path
    #     return temp_files_map

    # def update_nav(self, nav, temp_files_map):
    #     if not nav or not nav.items:
    #         return

    #     for item in nav.items:
    #         if isinstance(item, mkdocs.nav.Section):
    #             self.update_nav(item, temp_files_map)  # Recursive call for sections
    #         elif isinstance(item, mkdocs.nav.Page) and item.file.abs_src_path in temp_files_map:
    #             item.file.abs_src_path = temp_files_map[item.file.abs_src_path]
    #             item.file.src_path = os.path.basename(temp_files_map[item.file.abs_src_path])


        
    def create_iframe(self, share_name):
        iframe_html = f'<iframe src="{share_name}.html" width="100%" height="100%"></iframe>\n'
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
