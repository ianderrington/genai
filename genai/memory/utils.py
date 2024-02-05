import os
import git

class KeyDict(dict):
    def __hash__(self):
        return hash(frozenset(self.items()))
        

def clone_github(url, save_path, reclone=False):
    # Repo.clone_from(url, save_path)
    if os.path.exists(save_path) and not reclone:
        print(f"repo {url} already exists")
        return

    if not os.path.exists(save_path):
        os.makedirs(save_path)

    assert "github.com" in url, "only github repos are supported"
    branches = ["master", "main"]
    for branch in branches:
        try:
            repo = git.Repo.clone_from(url, save_path, branch=branch)
            break
        except:
            print(f"branch {branch} not found")
            continue
