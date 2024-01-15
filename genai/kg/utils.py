import git

def clone_github(url, save_path, reclone=False):
    # Repo.clone_from(url, save_path)
    if os.path.exists(save_path) and not reclone:
        print(f"repo {url} already exists")
        return

    if not os.path.exists(save_path):
        os.makedirs(save_path)

    assert url.startswith("git@github.com:")
    branches = ["master", "main"]
    for branch in branches:
        try:
            repo = git.Repo.clone_from(url, save_path, branch=branch)
            break
        except GitCommandError:
            print(f"branch {branch} not found")
            continue

import arxiv

def download_arxiv(urls, save_path):
    # get id from url
    # example url: https://arxiv.org/abs/1605.08386v1 or https://arxiv.org/pdf/1605.08386v1.pdf
    # id = "1605.08386v1"
    if not isinstance(urls, list):
        urls = [urls]
    ids = [] 
    for url in urls:
        ids = url.split("/")[-1].replace(".pdf", "")    
    
    for paper in arxiv.Client().results(arxiv.Search(ids)):
        # Download the PDF to a specified directory with a custom filename.
        basename = os.path.basename(save_path)
        basepath = os.path.dirname(save_path)
        paper.download_pdf(dirpath=base_path, filename=base_name)