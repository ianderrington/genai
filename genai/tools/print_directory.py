import os
import yaml
import argparse


def get_structure(directory, open_markdown=False, exclude_dirs=[]):
    structure = []
    # Check if directory exists
    if not os.path.exists(directory):
        print(f"Directory {directory} does not exist!")
        return structure

    # Walk through the directory
    for root, dirs, files in os.walk(directory):
        # Exclude specified directories
        dirs[:] = [d for d in dirs if d not in exclude_dirs]

        # Print the directory path
        # print(f"\n**Directory:** {root}")
        structure.append(f"\n**Directory:** {root}")
        # Check for .pages yaml file and print its contents with indentation
        if ".pages" in files:
            with open(os.path.join(root, ".pages"), "r") as f:
                pages_content = yaml.safe_load(f)
                # print("\nNavigation ")
                structure.append("\nNavigation ")
                # print(
                #     yaml.dump(pages_content["nav"], default_flow_style=False, indent=4)
                # )
                structure.append(
                    yaml.dump(pages_content["nav"], default_flow_style=False, indent=4)
                )
                files.remove(
                    ".pages"
                )  # Remove .pages from the list so it's not printed again

        # Print markdown files in the directory
        markdown_files = [f for f in files if f.endswith(".md")]
        if markdown_files:
            # print("\nMarkdown files:")
            structure.append("\nMarkdown files:")
            for md_file in markdown_files:
                # print(f" - {md_file}")
                structure.append(f" - {md_file}")
                if open_markdown:
                    with open(os.path.join(root, md_file), "r") as md:
                        for line in md:
                            if line.startswith("#"):
                                # print("    " * (line.count("#") - 1) + line.strip())
                                structure.append(
                                    "    " * (line.count("#") - 1) + line.strip()
                                )
    return structure

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Print the structure of a mkdocs repository."
    )
    parser.add_argument(
        "--repo_path",
        default="docs",
        help="Path to the mkdocs repository. Default is 'docs'.",
    )
    parser.add_argument(
        "--open_md",
        action="store_true",
        help="Open markdown files and print the headings.",
    )
    parser.add_argument(
        "--exclude",
        nargs="*",
        default=["assets", "stylesheets"],
        help="List of directories to exclude. Default is 'assets'.",
    )

    args = parser.parse_args()

    print(''.join(get_structure(args.repo_path, args.open_md, args.exclude)))
