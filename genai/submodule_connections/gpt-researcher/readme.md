Run 
```bash
setup.sh
```


```bash
conda activate gpt-researcher
python serper_check.py # Check if serper is working
python gpt_reporter.py # Runs the reporter
```

or, from the directory
```bash
cd assafelovic
conda activate gpt-researcher
uvicorn main:app --reload --port 8001
```