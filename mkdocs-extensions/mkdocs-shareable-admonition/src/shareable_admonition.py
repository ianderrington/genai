import os
import re
import markdown
import jinja2
import tempfile
from mkdocs.plugins import BasePlugin
from mkdocs.structure.files import File

class ShareableAdmonitionPlugin(BasePlugin):
    # RE = re.compile(r'(?:^|\n)(!!!|\?\?\?|\?\?\?\+)[ ]*([\w\-\+]+)[ ]+"([^"]+)"[ ]+([\w\-]+)(?:\n|$)')
    RE = re.compile(r'(?:^|\n)(!!!|\?\?\?|\?\?\?\+)\s*([\w\-\+]+)\s*"([^"]+)"\s+([\w\-]+)(?:\s|$)')

    TEMPLATE_NAME = 'admonition_template.html'

    def __init__(self):
        self.template_env = jinja2.Environment(
            loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates'))
        )

    def on_page_markdown(self, markdown_content, page, config, files):
        new_content = []
        admonition_block = []
        in_admonition = False
        share_name = None
        mkd_split = markdown_content.splitlines()
        for line_num, line in enumerate(mkd_split):
            # if line.startswith('???'):
            if self.RE.match(line):
            # if line and line[:3] or line[:4] in types:
                if line.startswith('???'):
                    import ipdb; ipdb.set_trace()
                in_admonition = True
                admonition_type, tag, title, share_name = self.RE.match(line).groups()
                new_line = ''.join([admonition_type, ' ', tag, ' "', title, '"'])
                new_content.append(new_line) 
                continue
            
            
            if in_admonition:
                # end_block = False
                if line.startswith('    '):
                    admonition_block.append(line[4:])  # Remove indentation
                    end_block = False
                elif line.startswith('\t'):
                    admonition_block.append(line[1:])  # Remove indentation
                    end_block = False
                elif line == '':
                    admonition_block.append(line)
                    end_block = False
                # elif line_num == len(mkd_split) - 1:
                #     admonition_block.append(line)
                #     end_block = True
                else:
                    end_block = True

                # elif line ==  "":  # Content of the admonition

                if end_block:

                    in_admonition = False
                    # Process extracted admonition block
                    admonition_content = '\n'.join(admonition_block)
                    admonition_block_content = markdown.markdown(admonition_content, extensions=config['markdown_extensions'])
                    shared_dir = os.path.join(config['site_dir'], 'shared')
                    os.makedirs(shared_dir, exist_ok=True)

                    admonition_html_path = os.path.join(shared_dir, f'{share_name}.html')
                    print(f"admonition_html_path: {admonition_html_path}")
                    if os.path.exists(admonition_html_path):
                        raise Exception(f'File {path} already exists. You have a duplicate admonition share name: {share_name}')
                    shareable_html_path = f'/shared/{share_name}.html'
                    full_page_url = os.path.join('/', page.url, shareable_html_path)
                    self.create_admonition_html(
                        path=admonition_html_path, 
                        content=admonition_block_content, 
                        title=title, 
                        description="Description", 
                        image_url=None, 
                        page_url=full_page_url, 
                        # backlink_url=full_page_url)
                        backlink_url=f'/{page.url}')


                    iframe_html = self.create_iframe(os.path.join('/shared', f'{share_name}.html'))
                 
                    new_content.append('    '+iframe_html)
                    admonition_block = []
                    new_content.append(line)  # Include the current line as it's outside the admonition
            else:
                new_content.append(line)

        return '\n'.join(new_content)


    def create_iframe(self, share_name):
        iframe_html = f'<iframe src="{share_name}" width="100%" height="100%" frameBorder="0" loading="lazy"></iframe>\n'
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
