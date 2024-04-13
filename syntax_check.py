import py_compile

try:
    py_compile.compile('genai/components/beta/parallel_shell.py', doraise=True)
    print("No syntax errors found.")
except py_compile.PyCompileError as e:
    print(f"Syntax error found: {e}")
