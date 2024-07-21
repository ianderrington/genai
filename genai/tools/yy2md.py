import logging
import os
import re
import sys
import yaml
import jinja2
from glob import iglob

from jinja2 import UndefinedError, TemplateNotFound
from mkdocs.config.config_options import OptionallyRequired
from mkdocs.config import config_options
from mkdocs.config.base import ValidationError
from mkdocs.plugins import BasePlugin
from mkdocs.structure.files import File

PYTHON_VERSION_MAJOR_MINOR = '{}.{}'.format(*sys.version_info)


class Y2MDEntry:
    def __init__(self, v):
        self.template_dir = v.get('template_dir', None)
        if self.template_dir is None:
            raise ValidationError('template_dir not found in entry {}'.format(v))


    def __str__(self):
        return f"template_dir: {self.template_dir}"



class Y2MDList(OptionallyRequired):
    """
    Y2MDList runs validation on config path data and return a list of Y2MDEntry
    """

    def run_validation(self, value):
        # import ipdb; ipdb.set_trace()
        if not isinstance(value, str):
            msg = ("Expected type: str but received: {}".format(type(value)))
            raise ValidationError(msg)
        else:
            return value


class Yaml2Markdown(BasePlugin):
    config_scheme = (
        ('template_dir', Y2MDList(default='str')),
        ('overwrite', config_options.Type(bool, default=False)),
        ('preserve_markdowns', config_options.Type(bool, default=True)),
        ('debug', config_options.Type(bool, default=False)),
        ('template_key', config_options.Type(str, default='render_template'))

        # 'template_dir',
            # ('overwrite', config_options.Type(bool, default=True))
    )

    def __init__(self, *args, **kwargs):
        self._logger = logging.getLogger('mkdocs.plugins.yaml2md')
        self._logger.setLevel(logging.INFO)
        console = logging.StreamHandler()
        formatter = logging.Formatter('%(name)s - %(message)s')
        console.setFormatter(formatter)
        self._logger.addHandler(console)

        self.mkdocs_config = None
        self.tpl_envs = {}
        # import ipdb; ipdb.set_trace()
        self.written_files = []  # Markdown written files
        self.cleanup_files = True
        super(Yaml2Markdown, self).__init__(*args, **kwargs)

    def on_config(self, config):
        self.template_dir = self.config['template_dir']
        self.template_key = self.config['template_key']
        self.mkdocs_config = config
        # create jinja env based on all input_dirs
        # for y2md_entry in template_dirs:
        #     template_dir = y2md_entry.template_dir
        self.tpl_envs[self.template_dir] = jinja2.Environment(
            loader=jinja2.FileSystemLoader(self.template_dir)
        )

    def on_files(self, files, config):
        """
        convert the yaml files to md files, if succeed, add the mkdocs files
        object and nav
        """

        base_dir = config['docs_dir']
        # for y2md_entry in self.config:
        # deal with dirs and get all yml paths
        # input_dir, output_dir = verify_and_get_abspath(y2md_entry, base_dir)

        yml_paths_iter = get_yml_iter(base_dir)

        for yml_path in yml_paths_iter:
            data = load_yaml_data(yml_path)

            if self.template_key not in data:
                continue

            md_path, md_rel_path = self.get_md_paths(
                yml_path,
                self.template_dir)

            if self.render_yam2md(yml_path, md_path, data,
                                  template_name=data[self.template_key ]):
                # if the yaml can be rendered successfully,
                # create file object with new md file path
                file_obj = File(
                    path=md_rel_path,
                    src_dir=config['docs_dir'],
                    dest_dir=config['site_dir'],
                    use_directory_urls=config['use_directory_urls']
                )

                # add it to files object and nav
                files.append(file_obj)
                # import ipdb;
                # ipdb.set_trace()
                config['nav'] = self.nest_paths(config['nav'], md_rel_path, md_path)

        return files

    def render_yam2md(self, yml_path, md_path, data, template_name):
        """
        Try to render the yaml file to md file based on the paths provided.

        The exceptions are `UndefinedError` and `TypeError` are all related
        to the template-data mis-matching. Therefore, we will skip yaml
        files without templates and yaml files matching with wrong templates.
        """
        # data = load_yaml_data(yml_path)
        # template = get_template(self.tpl_envs, data, input_dir)
        if not template_name.endswith('.md'):
            template_name += '.md'
        template = self.tpl_envs[self.template_dir].get_template(template_name)

        # # import ipdb;
        # ipdb.set_trace()
        try:
            validate_or_create_dir(md_path)

            if os.path.exists(md_path):
                msg = f'File {md_path} already exists. '

                if self.config['overwrite']:
                   msg += f'Overwriting. Set overwrite to false in mkdocs.yaml to prevent this or rename yaml file'
                else:
                    msg += f'Skipping. Set overwrite to True in mkdocs.yaml or delete file to generate from yaml.'
                    self._logger.info(msg)
                    return False

            with open(md_path, 'w+', encoding='UTF8') as fp:
                content = template.render(data=data)
                fp.write(content)

                self.written_files.append(md_path)
            return True

        except UndefinedError as e:
            msg_skipping = f'Error with {os.path.relpath(yml_path, self.mkdocs_config["docs_dir"])}:.'
            msg_skipping += '\n {}'.format(e)
            self._logger.info(msg_skipping)
        except TypeError as e:
            msg_skipping = f'Error with {os.path.relpath(yml_path, self.mkdocs_config["docs_dir"])}:.'
            msg_skipping += '\n {}'.format(e)
            self._logger.info(msg_skipping)
        return False

    def on_post_build(self, config, **kwargs):
        if not self.config['preserve_markdowns']:
            for file in self.written_files:
                os.remove(file)
                if self.config['debug']:
                    self._logger.info(f'Deleting generated file {file}')

    def nest_paths(self, nav, path, y2md_entry):
        """
        Given a path, convert them into a nested structure that will match
        the nav config.
        """
        nested = nav
        if not nav:
            return nav

        parts = path.split(os.path.sep)
        n_parts = len(parts)

        branch = nested
        for idx, part in enumerate(parts):
            part = dirname_or_filename_to_title(part)

            if idx < n_parts - 1:
                branch = find_or_create_node(branch, part, path)
            else:
                branch = find_or_create_node(branch, part, path, last=True)
        return nested

    def get_md_paths(self, yml_path, template_dir):
        yml_dirname, yml_basename = os.path.split(yml_path)
        yml_basename_root, _ = os.path.splitext(yml_basename)
        # yml_subdir = os.path.relpath(yml_dirname, template_dir)

        md_dir = yml_dirname#os.path.join(output_dir, yml_subdir)
        md_basename = '{0}.md'.format(yml_basename_root)
        md_path = os.path.join(md_dir, md_basename)
        md_rel_dir = os.path.relpath(md_dir, self.mkdocs_config['docs_dir'])
        md_rel_path = os.path.join(md_rel_dir, md_basename)
        return md_path, md_rel_path


def verify_and_get_abspath(y2md_entry, base_dir):
    output_dir = os.path.join(base_dir, y2md_entry.output_dir)
    input_dir = y2md_entry.input_dir
    if not os.path.isabs(input_dir):
        input_dir = os.path.join(base_dir, input_dir)
    if not os.path.exists(input_dir):
        raise ValueError("{} path not exists!".format(input_dir))
    return input_dir, output_dir


def get_yml_iter(input_dir, recursive=True):
    glob_recursive = recursive \
        if PYTHON_VERSION_MAJOR_MINOR >= '3.5' else False
    if glob_recursive:
        yml_paths_iter = iglob(os.path.join(
            input_dir, '**', '*.yaml'), recursive=True)
    else:
        yml_paths_iter = iglob(os.path.join(
            input_dir, '*.yaml'))
    return yml_paths_iter


def load_yaml_data(yml_path):
    """
    load yaml data and reform the key.
    """
    try:
        with open(yml_path) as fp:
            data = yaml.load(fp, Loader=yaml.FullLoader)
        data = {
            re.sub(r'\W+', '', k.replace(' ', '_').lower()): v
            for k, v in data.items()
        }
    except AttributeError as e:
        msg = f'{yml_path} is not rendering properly, with an attribute error'
        raise AttributeError(msg)
    return data


def validate_or_create_dir(path):
    dirname, basename = os.path.split(path)
    if not os.path.exists(dirname):
        os.makedirs(dirname)


def dirname_or_filename_to_title(name):
    """ Return a page tile obtained from a directory name. """
    title = name if not name.endswith('.md') else name[:-3]
    title = title.replace('-', ' ').replace('_', ' ')
    if title.lower() == title:
        title = title.title()

    return title


def find_or_create_node(branch, key, path, last=False):
    """

    Given a key/path, look for dictionary with a key matching key and return
     it's value. If it doesn't exist, create it with the key:path pair and
    return that.

    For example:
     'a/b/c_mm.md' -> [{'A': [{'B': [{'C Mm': 'a/b/c_mm.md'}]}]}]
    """
    if isinstance(branch, str):
        raise ValueError('Invalid toc path, please choose another one.')

    for node in branch:
        if not isinstance(node, dict):
            continue

        if key in node:
            return node[key]

    if not last:
        new_branch = []
    else:
        new_branch = path
    node = {key: new_branch}
    branch.append(node)
    return new_branch