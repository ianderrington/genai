import argparse
import re
import os

def resolve_merge_conflict(file_path, preferred_branch):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    resolved_lines = []
    conflict = False
    keep_lines = False

    for line in lines:
        if re.match(r'^<<<<<<<\s', line):
            conflict = True
            keep_lines = (preferred_branch in line)
        elif re.match(r'^=======', line):
            keep_lines = not keep_lines
        elif re.match(r'^>>>>>>>', line):
            conflict = False
        elif not conflict or keep_lines:
            resolved_lines.append(line)

    with open(file_path, 'w') as file:
        file.writelines(resolved_lines)

def main():
    parser = argparse.ArgumentParser(description='Resolve merge conflicts by choosing the preferred branch.')
    parser.add_argument('file', help='Path to the conflicted file')
    parser.add_argument('preferred_branch', help='Preferred branch to keep')

    args = parser.parse_args()

    resolve_merge_conflict(args.file, args.preferred_branch)

if __name__ == '__main__':
    main()
