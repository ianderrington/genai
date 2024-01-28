from mkdocs.plugins import BasePlugin
import os
import re

class AdmonitionSubPagesPlugin(BasePlugin):
    sub_dir = 'admonition_subpages'

    def on_pre_build(self, config):
        admonition_dir = os.path.join(config['site_dir'], self.sub_dir)
        if not os.path.exists(admonition_dir):
            os.makedirs(admonition_dir)

    def process_file(self, file, config):
        with open(file.abs_src_path, 'r') as f:
            content = f.read()

        admonitions = re.findall(r'!!!\s+([\w\-]+)[\s\n]+([\s\S]+?)(?=^!!!|\Z)', content, re.MULTILINE)

        for idx, (admonition_type, admonition_content) in enumerate(admonitions):
            temp_filename = f'temp_{file.name}_{idx}.md'
            temp_filepath = os.path.join(config['site_dir'], self.sub_dir, temp_filename)

            with open(temp_filepath, 'w') as temp_file:
                # Example Meta Tags
                temp_file.write(f'---\nog:title: {admonition_type.capitalize()}\nog:description: {admonition_content.splitlines()[0]}\n---\n')
                temp_file.write(admonition_content)

    def on_post_build(self, config):
        admonition_dir = os.path.join(config['site_dir'], self.sub_dir)
        # Cleanup temporary files and directory
        if os.path.exists(admonition_dir):
            for temp_file in os.listdir(admonition_dir):
                os.remove(os.path.join(admonition_dir, temp_file))
            os.rmdir(admonition_dir)

def makeExtension(**kwargs):
    return AdmonitionSubPagesPlugin(**kwargs)

