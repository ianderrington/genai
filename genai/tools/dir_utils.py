from pathlib import Path


class DisplayablePath(object):
    display_filename_prefix_middle = '├──'
    display_filename_prefix_last = '└──'
    display_parent_prefix_middle = '    '
    display_parent_prefix_last = '│   '

    def __init__(self, path, parent_path, is_last, hidden_file_extensions=None):
        self.path = Path(str(path))
        self.parent = parent_path
        self.is_last = is_last
        if self.parent:
            self.depth = self.parent.depth + 1
        else:
            self.depth = 0

        if hidden_file_extensions is None:
            hidden_file_extensions = []
        self.hidden_file_extensions = hidden_file_extensions

    


    @property
    def displayname(self):
        if self.path.is_dir():
            return self.path.name + '/'
        return self.path.name

    @classmethod
    def make_tree(cls, root, parent=None, is_last=False, criteria=None):
        root = Path(str(root))
        criteria = criteria or cls._default_criteria

        displayable_root = cls(root, parent, is_last)
        yield displayable_root

        children = sorted(list(path
                               for path in root.iterdir()
                               if criteria(path)),
                          key=lambda s: str(s).lower())
        count = 1
        for path in children:
            is_last = count == len(children)
            if path.is_dir():
                yield from cls.make_tree(path,
                                         parent=displayable_root,
                                         is_last=is_last,
                                         criteria=criteria)
            else:
                yield cls(path, displayable_root, is_last)
            count += 1

    @classmethod
    def _default_criteria(cls, path):
        return True

    @property
    def displayname(self):
        if self.path.is_dir():
            return self.path.name + '/'
        return self.path.name

    def displayable(self):
        if self.parent is None:
            return self.displayname

        _filename_prefix = (self.display_filename_prefix_last
                            if self.is_last
                            else self.display_filename_prefix_middle)

        parts = ['{!s} {!s}'.format(_filename_prefix,
                                    self.displayname)]

        parent = self.parent
        while parent and parent.parent is not None:
            parts.append(self.display_parent_prefix_middle
                         if parent.is_last
                         else self.display_parent_prefix_last)
            parent = parent.parent

        return ''.join(reversed(parts))

# With a criteria (skip hidden files)
def is_not_hidden(path, hidden_file_extensions=None):
    if not hidden_file_extensions:
        name_filter = ['Icon', '.DS_Store', 'stylesheets', 'CNAME', 'assets', '.svg', '.git','.gitignore','.vscode', '.eslint','.eslintrc.json', '.prettierrc.json', '.prettierignore', '.github', '.gitignore', '.gitattributes', '.editorconfig', '.npmrc', '.nvmrc', '.yarnrc', '.yarn', '.yarn-integrity', '.yarn-metadata', '.yarnignore', '.yarnclean', '.yarn-version', '.yarnrc.yml', '.yarnrc.yaml', '.yarnrc.json'
        '.pages', 'dist', 'functions', 'node_modules', '@babel', '.git', 'package-lock.json', 'package.json', 'README.md', 'LICENSE', 'yarn.lock', '.babelrc','.eslintrc','.firebaserc','.prettierrc']

    return not (path.name in name_filter)


def get_tree_structure(path_base):
    
    paths = DisplayablePath.make_tree(Path(path_base), criteria=is_not_hidden)
    path_str = [p.displayable() for p in paths]
    # for path in paths:
    #     print(path.displayable())
    # return ''.join([p for p in path.displayable()])
    return '\n'.join(path_str)
   