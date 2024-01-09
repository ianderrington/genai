import re
import argparse

def parse_markdown(input_filename, output_filename):
    with open(input_filename, 'r') as infile:
        lines = infile.readlines()
        tsv_rows = []
        for line in lines:
            bolded_words = re.findall(r'\*\*(.*?)\*\*', line)
            line = re.sub(r'\*\*(.*?)\*\*', '', line).strip()
            text = line.split()
            row = bolded_words + text
            tsv_rows.append(row)

        with open(output_filename, 'w', newline='') as outfile:
            for row in tsv_rows:
                outfile.write('\t'.join(row) + '\n')

def main():
    parser = argparse.ArgumentParser(description='Parse a markdown file and convert to TSV.')
    parser.add_argument('input_filename', type=str, help='The name of the markdown file to parse.')
    parser.add_argument('output_filename', type=str, help='The name of the output TSV file.')
    args = parser.parse_args()
    parse_markdown(args.input_filename, args.output_filename)

if __name__ == '__main__':
    main()

