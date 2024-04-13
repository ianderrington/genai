from genai.components.beta.parallel_shell import BashShell

def test_bash_shell():
    print("Starting test of BashShell...")
    shell = BashShell()
    try:
        shell.execute('echo "Hello, World!"')
        print("Test completed successfully, no errors.")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        shell.cleanup()

if __name__ == "__main__":
    test_bash_shell()
