import unittest
import tempfile
import os
from pathlib import Path
import shutil

# Assuming the script above is saved in a file named `replace_github_links.py`
from genai.tools.add_github_stars import replace_github_links_in_file

class TestGithubLinkReplacement(unittest.TestCase):
    def setUp(self):
        # Set up a temporary directory
        self.test_dir = tempfile.mkdtemp()
        self.test_file = Path(self.test_dir) / "test.md"
        with open(self.test_file, 'w', encoding='utf-8') as f:
            f.write("[RECURSIVELY SELF-IMPROVING CODE GENERATION](https://github.com/microsoft/stop)")

    def tearDown(self):
        # Clean up the temporary directory
        shutil.rmtree(self.test_dir)

    def test_link_replacement(self):
        replace_github_links_in_file(str(self.test_file))
        
        with open(self.test_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        expected_content = "[GitHub Repo stars](https://badgen.net/github/stars/microsoft/stop)  [RECURSIVELY SELF-IMPROVING CODE GENERATION](https://github.com/microsoft/stop)"
        self.assertEqual(content, expected_content)

if __name__ == "__main__":
    unittest.main()
