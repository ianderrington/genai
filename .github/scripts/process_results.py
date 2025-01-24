import json
import sys

def process_results(results_file):
    with open(results_file) as f:
        results = json.load(f)
    
    invalid = [r for r in results if not r['is_valid']]
    for r in invalid[:10]:  # Show first 10 broken links
        print(f"::warning file={r['file_path']},line={r['line_number']}::Broken link: {r['link']} - {r['error_message']}")
    
    return len(invalid)

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: process_results.py <results_file>")
        sys.exit(1)
    
    invalid_count = process_results(sys.argv[1])
    print(f"::set-output name=invalid_count::{invalid_count}") 