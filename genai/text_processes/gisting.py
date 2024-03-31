from genai.text_processes.utils import count_words

prompt_shorten_template = """
Please shorten the following passage.
Just give me a shortened version. DO NOT explain your reason.

Passage:
{}

"""

def quality_gisting(example, pages, word_limit=600, start_threshold=280, verbose=True):
  article = example['article']
  title = example['title']
  word_count = count_words(article)
  print(f"[Gisting][Article {title}], {word_count} words")

  shortened_pages = []
  for i, page in enumerate(pages):
    prompt = prompt_shorten_template.format('\n'.join(page))
    response = query_model(prompt)
    shortened_text = response.strip()
    shortened_pages.append(shortened_text)
    if verbose:
      print("[gist] page {}:".format(i), shortened_text, flush=True)
  shortened_article = '\n'.join(shortened_pages)
  gist_word_count = count_words(shortened_article)
  if verbose:
    print("Shortened article:\n", shortened_article, flush=True)
  output = copy.deepcopy(example)
  output.update({'title': title, 'word_count': word_count, 'gist_word_count': gist_word_count, 'shortened_pages': shortened_pages, 'pages': pages})
  if verbose:
    print(f"compression rate {round(100.0 - gist_word_count/word_count*100, 2)}% ({gist_word_count}/{word_count})")
  return output
