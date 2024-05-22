from abc import ABC, abstractmethod
import subprocess
from pathlib import Path
from collections import deque
import threading
import threading
import queue
import time

import select

## TODo: add a timeout to the select call to prevent hanging - May involve rewriting the execute method
# https://stackoverflow.com/questions/1191374/using-module-subprocess-with-timeout

class AbstractPersistentShell(ABC):
    def __init__(self, shell_name='default_shell', starting_dir=".", max_parents=1, history_limit=100):
        self.shell_name = shell_name
        self.working_dir = Path(starting_dir).resolve()
        self.base_dir = self.working_dir
        self.max_parents = max_parents
        self.history = []
        self.command_history = deque(maxlen=history_limit)  # Limited command history
        self.output_history = deque(maxlen=history_limit)  # Limited output history
        self.process = None  # To be initialized in subclasses
        self.stop_signal = threading.Event()


    @abstractmethod
    def execute(self, command):
        raise NotImplementedError("Subclasses must implement this method.")

    def cleanup(self):
        raise NotImplementedError("Subclasses must implement this method.")

    def capture_output(self, stream, stop_signal):
        while not stop_signal.is_set():
            # Check if the stream is ready for reading
            ready_to_read, _, _ = select.select([stream], [], [], 0.1)
            if ready_to_read:
                line = stream.readline()
                if line:
                    self.output_history.append(line)
                    print(line, end='')
                else:  # End of file
                    break
            # Otherwise, continue looping and check if the stop signal is set

    def start_output_capture(self):
        self.stdout_thread = threading.Thread(target=self.capture_output, args=(self.process.stdout, self.stop_signal))
        self.stderr_thread = threading.Thread(target=self.capture_output, args=(self.process.stderr, self.stop_signal))
        self.stdout_thread.start()
        self.stderr_thread.start()
    
    def __enter__(self):
        # For most context managers, simply return self
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.cleanup()

    def __del__(self):
        self.cleanup()
       
# https://stackoverflow.com/questions/8052926/running-subprocess-within-different-virtualenv-with-python
# import subprocess
    
# cmd = 'source activate my_virtualenv; python my_script.py'
# subprocess.call(cmd, shell=True, executable='/bin/bash')
# Another solution
# import subprocess

# subprocess.Popen(["virtualenv1/bin/python", "my_script.py"])
# subprocess.Popen(["virtualenv2/bin/python", "my_other_script.py"])

class BashShell(AbstractPersistentShell):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.process = subprocess.Popen(["/bin/bash"], stdin=subprocess.PIPE, 
            
            stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, 
            cwd=str(self.working_dir), bufsize=1, universal_newlines=True, shell=False,)
        self.cleaned_up = False
        self.start_output_capture()  # Start capturing stdout and stderr

    def parse_command(self, command):
        # Special handling for 'cd' to update working_dir
        # Note that this does not work for 'shell scripts or multi line commands'
        if command.startswith('cd'):
            new_dir = command.split(maxsplit=1)[1]
            self.working_dir = Path(self.working_dir, new_dir).resolve()
        flush_command ='; sys.stdout.flush()\n'
        return command

    def execute(self, command):
        # Ensure command ends with a newline
        command = self.parse_command(command)

        if not command.endswith('\n'):
            command += '\n'
        
        self.command_history.append(command)  # Record command

        # Write the command to the bash subprocess
        self.process.stdin.write(command)

        # Capture the command's output
        output_lines = []
        count = 0
        while True:
            count += 1
            print(f"Count: {count}")
            # Use select to wait for output to be available
            ready, _, _ = select.select([self.process.stdout], [], [], 0.1)
            if ready:
                print('Ready to read output...')
                # this sometimes hangs here or produces None
                output_line = self.process.stdout.readline()
                if output_line is None:
                    print("Readline returned None, which may indicate the process has closed the stream.")
                    break
                print(f"Output line: {output_line}")
                if output_line:
                    output_lines.append(output_line)
                else:  # No more output
                    print("No more output from process.")
                    break
            else:
                # No output ready, the command has likely finished executing
                print("No output ready, command may have finished executing.")
                break
        self.process.stdin.flush()

        
        # Return the captured output as a single string
        time.sleep(0.1)  

        return ''.join(output_lines)
    
    def cleanup(self):
        if not self.cleaned_up:
            print("Starting cleanup...")
            self.stop_signal.set()

            # Close stdin to signal the subprocess that no more input will be sent
            self.process.stdin.close()
            print("stdin closed.")

            # Wait for the subprocess to terminate
            self.process.terminate()
            print("Subprocess terminated.")
            self.process.wait()
            print("Subprocess wait completed.")

            # Now that the subprocess is terminated, its streams are empty
            # It's safe to join the threads as they will exit their loops
            if self.stdout_thread.is_alive():
                self.stdout_thread.join()
                print("stdout_thread joined.")
            if self.stderr_thread.is_alive():
                self.stderr_thread.join()
                print("stderr_thread joined.")

            # Finally, close the remaining open streams
            self.process.stdout.close()
            self.process.stderr.close()
            print("stdout and stderr closed.")

            self.cleaned_up = True
            print("Cleanup completed.")
        else:
            print("Cleanup already performed.")
            self.stderr_thread.join(timeout=1)
            
            if self.stdout_thread.is_alive() or self.stderr_thread.is_alive():
                print("Warning: Output capture threads did not exit cleanly.")



class CondaShell(BashShell):
    def __init__(self, env_name='default_env', python_version='3.10', **kwargs):
        super().__init__(**kwargs)
        self.env_name = env_name
        self.python_version = python_version
        self.initialize_conda_env()

    def initialize_conda_env(self):
        # Record environment setup commands in the history
        self.command_history.append(f"conda env list")
        env_list = subprocess.run(["conda", "env", "list"], capture_output=True, text=True)
        if self.env_name not in env_list.stdout:
            create_command = f"conda create --name {self.env_name} python={self.python_version} -y"
            self.command_history.append(create_command)
            print(f"Creating Conda environment '{self.env_name}'...")
            subprocess.run(create_command.split(), capture_output=True, text=True)
        activate_command = f"source activate {self.env_name}"
        self.command_history.append(activate_command)
        print(f"Activating Conda environment '{self.env_name}'...")
        self.execute(activate_command)
        print(f"Conda environment '{self.env_name}' is ready.")

    def execute(self, command):
        super().execute(command)
