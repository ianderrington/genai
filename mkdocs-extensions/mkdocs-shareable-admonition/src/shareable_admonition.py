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

    def get_image_and_first_text_from_block(self, line_content):
        # choose the first image, return None if no image found
        image_url = ""
        description = ""
        for line in line_content:
            if line.startswith('!['):
                image_url = re.search(r'!\[.*\]\((.*)\)', line).group(1)
            elif line.startswith('<img'):
                image_url = re.search(r'<img.*src="(.*)".*>', line).group(1)
            elif not description and line:
                description = line
            if image_url:
                break
        # $ remove any "> at the end of the url
        if image_url:
            image_url = image_url.split('"')[0]
        print(f"image_url: {image_url}")
        print(f"description: {description}")
        # import ipdb; ipdb.set_trace()
        return description, image_url
    
    def on_page_markdown(self, markdown_content, page, config, files):
        new_content = []
        admonition_block = []
        in_admonition = False
        share_name = None
        mkd_split = markdown_content.splitlines()
        last_image = None
        id_number = 0
        for line_num, line in enumerate(mkd_split):

            matches = self.RE.match(line)
            if  matches:

                in_admonition = True
                admonition_type, tag, title, share_name = matches.groups()
                new_line = ''.join([admonition_type, ' ', tag, ' "', title, '"'])
                
                in_admonition_space_count = 0
                continue

            
            if in_admonition:                
                if line_num == len(mkd_split) - 1 or in_admonition_space_count > 1:
                    admonition_block.append(line)
                    end_block = True
                elif line.startswith('    '):
                    admonition_block.append(line[4:])  # Remove indentation
                    in_admonition_space_count = 0
                    end_block = False
                elif line.startswith('\t'):
                    admonition_block.append(line[1:])  # Remove indentation
                    in_admonition_space_count = 0
                    end_block = False
                elif line == '': 
                    in_admonition_space_count += 1
                    admonition_block.append(line)
                    end_block = False
                else:
                    in_admonition_space_count = 0
                    end_block = True

                if end_block:
                    in_admonition = False
                    # Process extracted admonition block
                    self.process_admonition_block(admonition_block, share_name, config, page, title)
                    admonition_url = f'/shared/{share_name}.html'
                    # http://127.0.0.1:8000/Understanding/overview/Understanding/overview/index.html/shared/heirarchy-of-genai.html
                    # iframe_html = self.create_iframe(os.path.join(admonition_url))
                 
                    # new_content.append('    '+iframe_html)
                    copy_button = self.create_copy_button(admonition_url=admonition_url, id_number=id_number)
                    id_number += 1
                    new_content.append(copy_button)
                    new_content.append(new_line)
                    new_content += ['    ' + ab for ab in admonition_block]
                    # import ipdb; ipdb.set_trace()
                    admonition_block = []
                    # new_content.append(line)  # Include the current line as it's outside the admonition
            else:
                new_content.append(line)
            # else:
            # if not matches:
            #     new_content.append(line)
            #     new_content.append(line)

        return '\n'.join(new_content)

    def create_copy_button(self, admonition_url, id_number):
        element_id = f'page-url-{id_number}'
        template = """
<a href="{{ page_url|default("#") }}" class="page-url" id="{{ element_id }}"></a>
<!-- Clipboard copy icon/button -->
<div class="copy-wrapper">

<span class="copy-icon" id="copy-icon" onclick="copyToClipboard('{{ element_id }}')"> &#128203;</span>
<!-- Copied popup -->
<div class="copied-popup" id="popup-{{ element_id }}">Link copied!</div>
</div>

            """
        template = jinja2.Template(template)
        return template.render(page_url=admonition_url, element_id=element_id)
    
    def process_admonition_block(self, admonition_block, share_name, config, page, title):
        description, image_url = self.get_image_and_first_text_from_block(admonition_block)

        admonition_content = '\n'.join(admonition_block)
        admonition_block_content = markdown.markdown(admonition_content, extensions=config['markdown_extensions'])
        shared_dir = os.path.join(config['site_dir'], 'shared')
        os.makedirs(shared_dir, exist_ok=True)

        admonition_html_path = os.path.join(shared_dir, f'{share_name}.html')
        print(f"admonition_html_path: {admonition_html_path}")
        if os.path.exists(admonition_html_path):
            raise ValueError(f'File {path} already exists. You have a duplicate admonition share name: {share_name}')
        shareable_html_path = f'/shared/{share_name}.html'
        full_page_url = config['site_url']+os.path.join('/', page.url, shareable_html_path)
        page_url = config['site_url'] + full_page_url
        backlink_url = config['site_url'] + f'/{page.url}'
        if not title:
            title = 'Sharing information from www.managen.ai'
        if not description:
            description = title

        self.create_admonition_html(
            path=admonition_html_path, 
            content=admonition_block_content, 
            title=title, 
            description=description,
            image_url=image_url, 
            page_url=full_page_url, 
            # backlink_url=full_page_url)
            backlink_url=backlink_url, 
            config=config)

    


    # def create_iframe(self, share_name):
    #     iframe_html = f'<iframe src="{share_name}" width="100%" height="100%" frameBorder="0" loading="lazy"></iframe>\n'
    #     return iframe_html

    def create_admonition_html(self, path, content, title, description, image_url, page_url, backlink_url, config):
        title = markdown.markdown(title, extensions=config['markdown_extensions'])
        description = markdown.markdown(description, extensions=config['markdown_extensions'])
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
