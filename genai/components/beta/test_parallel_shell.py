import unittest
import os
from tempfile import TemporaryDirectory
from pathlib import Path

import subprocess
from parallel_shell import BashShell, CondaShell

class TestPersistentShell(unittest.TestCase):
    def test_some_shell_operation(self):
        with BashShell() as shell:
            output = shell.execute('echo Hiya')
            self.assertEqual(output, 'Hiya\n')

    def test_command_timeout(self):
        """Test that a command times out if it takes too long."""
        with BashShell() as bash_shell:
            start_time = time.time()
            output = bash_shell.execute('sleep 5', timeout=2)
            end_time = time.time()
            self.assertTrue(end_time - start_time < 5, "The command did not timeout as expected.")
            self.assertIn("Command timed out.", output)

    def test_temporary_directory_operations(self):
        """Test operations within a temporary working directory."""
        with TemporaryDirectory() as temp_dir:
            bash_shell = BashShell(starting_dir=temp_dir)
            # Test command execution and file creation
            bash_shell.execute('touch temp_file.txt')
            self.assertTrue(Path(temp_dir, 'temp_file.txt').exists())
            # Test changing directory within the temporary directory
            # os.mkdir(Path(temp_dir, 'subdir'))
            bash_shell.execute(f'mkdir {temp_dir}/subdir')
            bash_shell.execute('cd subdir')
            print(bash_shell.working_dir)
            print(Path(temp_dir, 'subdir').resolve())

            self.assertEqual(bash_shell.working_dir, Path(temp_dir, 'subdir').resolve())
            bash_shell.__exit__(None, None, None)  # Cleanly exit the shell

    def test_permanent_directory_operations(self):
        """Test operations within a permanent working directory."""
        permanent_dir = Path('permanent_test_dir').resolve()
        os.makedirs(permanent_dir, exist_ok=True)
        bash_shell = BashShell(starting_dir=permanent_dir)
        try:
            # Test command execution and file creation
            bash_shell.execute('touch permanent_file.txt')
            self.assertTrue(Path(permanent_dir, 'permanent_file.txt').exists())
            # Clean up
            Path(permanent_dir, 'permanent_file.txt').unlink()
        finally:
            bash_shell.__exit__(None, None, None)
            os.rmdir(permanent_dir)  # Remove the directory after the test

    def test_output_capture(self):
        """Test capturing output from the shell."""
        with BashShell() as bash_shell:
            output = bash_shell.execute('echo "Hello, world!"')
            self.assertEqual(output, 'Hello, world!\n')

    def test_history_limit(self):
        """Test that the history limit is enforced."""
        with BashShell(starting_dir=".") as bash_shell:
            number_of_commands = 6
            for i in range(number_of_commands):  # Exceed the default history limit
                command_i = f"Command {i}"
                output = bash_shell.execute(f'echo {command_i}')
                self.assertEqual(output, f'{command_i}\n')
            self.assertEqual(len(bash_shell.command_history), number_of_commands)  # Assuming the default limit is 100
            # self.assertEqual(len(bash_shell.output_history), 100)

    def test_command_timeout(self):
        """Test that a command times out if it takes too long."""
        with BashShell() as bash_shell:
            start_time = time.time()
            output = bash_shell.execute('sleep 5', timeout=2)
            end_time = time.time()
            self.assertTrue(end_time - start_time < 5, "The command did not timeout as expected.")
            self.assertIn("Command timed out.", output)

class TestCondaShell(unittest.TestCase):
    test_env_name = "test_condashell_env"

#     @classmethod
#     def setUpClass(cls):
#         # Ensure the test environment does not already exist
#         cls.remove_test_env()

#     @classmethod
#     def tearDownClass(cls):
#         # Cleanup: Remove the test Conda environment after all tests
#         cls.remove_test_env()

#     @classmethod
#     def remove_test_env(cls):
#         """Remove the test Conda environment if it exists."""
#         subprocess.run(["conda", "env", "remove", "--name", cls.test_env_name, "--yes"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

#     def test_environment_creation_and_activation(self):
#         """Test if CondaShell creates and activates a Conda environment."""
#         with TemporaryDirectory() as temp_dir, CondaShell(env_name=self.test_env_name, starting_dir=temp_dir) as conda_shell:
#             # Verify the environment was created
#             env_list_output = subprocess.check_output(["conda", "env", "list"]).decode()
#             self.assertIn(self.test_env_name, env_list_output)

#             # Test command execution within the environment
#             # This can be a command that only succeeds if the correct environment is activated
#             conda_shell.execute('python -c "import sys; print(sys.executable)"')
#             # Assuming history capturing is correctly implemented
#             # last_output = conda_shell.output_history[-1].strip()
#             output= conda_shell.execute('conda env list')
#             self.assertIn(self.test_env_name, output)
#             # self.assertIn(self.test_env_name, last_output)

    # def test_command_execution_in_conda_environment(self):
    #     """Test executing a command within the created Conda environment."""
    #     with CondaShell(env_name=self.test_env_name) as conda_shell:
    #         # Example: check if the correct Python version is being used
    #         output = conda_shell.execute('python --version')
    #         self.assertTrue(output.startswith("Python"))

if __name__ == '__main__':
    unittest.main()
