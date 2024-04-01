# Based on https://github.com/read-agent/read-agent.github.io/blob/main/assets/read_agent_demo.ipynb

from genai.text_processes.utils import count_words
import re, time, datetime, json, string, copy
#@title Helper functions

all_lowercase_letters = string.ascii_lowercase  # "abcd...xyz"
bracketed_lowercase_letters_set = set(
    [f"({l})" for l in all_lowercase_letters]
)  # {"(a)", ...}
bracketed_uppercase_letters_set = set(
    [f"({l.upper()})" for l in all_lowercase_letters]
)  # {"(a)", ...}

choices = ['(A)', '(B)', '(C)', '(D)']

def get_index_from_symbol(answer):
  """Get the index from the letter symbols A, B, C, D, to extract answer texts.

  Args:
    answer (str): the string of answer like "(B)".

  Returns:
    index (int): how far the given choice is from "a", like 1 for answer "(B)".
  """
  answer = str(answer).lower()
  # extract the choice letter from within bracket
  if answer in bracketed_lowercase_letters_set:
    answer = re.findall(r"\(.*?\)", answer)[0][1]
  index = ord(answer) - ord("a")
  return index


def quality_gutenberg_parser(raw_article):
  """Parse Gutenberg articles in the QuALITY dataset.
  """
  lines = []
  previous_line = None
  for i, line in enumerate(raw_article.split('\n')):
    line = line.strip()
    original_line = line
    if line == '':
      if previous_line == '':
        line = '\n'
      else:
        previous_line = original_line
        continue
    previous_line = original_line
    lines.append(line)
  return ' '.join(lines)



prompt_pagination_template = """
You are given a passage that is taken from a larger text (article, book, ...) and some numbered labels between the paragraphs in the passage.
Numbered label are in angeled brackets. For example, if the label number is 19, it shows as <19> in text.
Please choose one label that it is natural to break reading.
Such point can be scene transition, end of a dialogue, end of an argument, narrative transition, etc.
Please answer the break point label and explain.
For example, if <57> is a good point to break, answer with \"Break point: <57>\n Because ...\"

Passage:

{0}
{1}
{2}

"""

def parse_pause_point(text):
  text = text.strip("Break point: ")
  if text[0] != '<':
    return None
  for i, c in enumerate(text):
    if c == '>':
      if text[1:i].isnumeric():
        return int(text[1:i])
      else:
        return None
  return None


def quality_pagination(example, query_model,
                       word_limit=600,
                       start_threshold=280,
                       max_retires=10,
                       verbose=True,
                       allow_fallback_to_last=True):
  article = example['article']
  title = example['title']
  print(f"[Pagination][Article {title}]")
  paragraphs = quality_gutenberg_parser(article).split('\n')
  i = 0
  pages = []
  while i < len(paragraphs):
    preceding = "" if i == 0 else "...\n" + '\n'.join(pages[-1])
    passage = [paragraphs[i]]
    wcount = count_words(paragraphs[i])
    j = i + 1
    while wcount < word_limit and j < len(paragraphs):
      wcount += count_words(paragraphs[j])
      if wcount >= start_threshold:
        passage.append(f"<{j}>")
      passage.append(paragraphs[j])
      j += 1
    passage.append(f"<{j}>")
    end_tag = "" if j == len(paragraphs) else paragraphs[j] + "\n..."

    import ipdb; ipdb.set_trace()
    pause_point = None
    if wcount < 350:
      pause_point = len(paragraphs)
    else:
      prompt = prompt_pagination_template.format(preceding, '\n'.join(passage), end_tag)
      response = query_model(prompt=prompt).strip()
      pause_point = parse_pause_point(response)
      if pause_point and (pause_point <= i or pause_point > j):
        print(f"prompt:\n{prompt},\nresponse:\n{response}\n")
        print(f"i:{i} j:{j} pause_point:{pause_point}")
        pause_point = None
      if pause_point is None:
        if allow_fallback_to_last:
          pause_point = j
        else:
          raise ValueError(f"prompt:\n{prompt},\nresponse:\n{response}\n")

    page = paragraphs[i:pause_point]
    pages.append(page)
    if verbose:
      print(f"Paragraph {i}-{pause_point-1}", page)
    i = pause_point
  print(f"[Pagination] Done with {len(pages)} pages")
  return pages