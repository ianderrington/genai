import os
import unittest

class TestResolveMergeConflict(unittest.TestCase):

    def setUp(self):
        # Create a sample conflicted file
        self.file_path = 'test_conflict.txt'
        with open(self.file_path, 'w') as file:
            file.write('''<<<<<<< branch_a
"version": "7.23.5",
"resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.23.5.tgz",
"integrity": "sha512-hOOqoiNXrmGdFbhgCzu6GiURxUgM27Xwd/aPuu8RfHEZPBzL1Z54okAHAQjXfcQNwvrlkAmAp4SlRTZ45vlthQ==
=======
"version": "7.22.5",
"resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.22.5.tgz",
"integrity": "sha512-DFZMC9LJUG9PLOclRC32G63UXwzqS2koQC8dkx+PLdmt1xSePYpbT/NbsrJy8Q/muXz7o/h/d4A7Fuyixm559Q==
>>>>>>> branch_b
''')

    def tearDown(self):
        # Clean up the file after test
        if os.path.exists(self.file_path):
            os.remove(self.file_path)

    def test_resolve_merge_conflict_branch_a(self):
        resolve_merge_conflict(self.file_path, 'branch_a')
        with open(self.file_path, 'r') as file:
            content = file.read()
        expected_content = '''"version": "7.23.5",
"resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.23.5.tgz",
"integrity": "sha512-hOOqoiNXrmGdFbhgCzu6GiURxUgM27Xwd/aPuu8RfHEZPBzL1Z54okAHAQjXfcQNwvrlkAmAp4SlRTZ45vlthQ==
'''
        self.assertEqual(content, expected_content)

    def test_resolve_merge_conflict_branch_b(self):
        resolve_merge_conflict(self.file_path, 'branch_b')
        with open(self.file_path, 'r') as file:
            content = file.read()
        expected_content = '''"version": "7.22.5",
"resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.22.5.tgz",
"integrity": "sha512-DFZMC9LJUG9PLOclRC32G63UXwzqS2koQC8dkx+PLdmt1xSePYpbT/NbsrJy8Q/muXz7o/h/d4A7Fuyixm559Q==
'''
        self.assertEqual(content, expected_content)

if __name__ == '__main__':
    unittest.main()
