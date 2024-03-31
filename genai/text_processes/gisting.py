from genai.text_processes.utils import count_words
import re, time, datetime, json, string, copy



def quality_gisting(example, pages, query_model, word_limit=600, start_threshold=280, verbose=True):

    prompt_shorten_template = """
    Please shorten the following passage.
    Just give me a shortened version. DO NOT explain your reason.

    Passage:
    {}

    """
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

template_for_machine_learning = {"Developments": 
    "This briefly describes the notable and important developments due to the paper. They should be high level and "
    "not too detailed. If there are multiple developments, they should be separated by bullet points.",
    "Data": 
    " This should be a brief description of the data used in the paper. It might include the data-source names, "
    " any cleaning they did, and any new data they collected.",
    "Models":
    "This should be a brief description of the model used in the paper. It should include the type of models used, "
    "if any new architectures were introduced, and any new techniques used in the model.",
    "Training": 
    "This should be a brief description of the training process used in the paper. It should include the optimizer used, "
    "the learning rate, the batch sizes, or other things that are important to the training process, "
    " such as training from scratch or transfer learning.",
    "Results":
    "This should be a brief description of the results of the paper. It should include the evaluation metrics used, "
    "the performance of the model, and any comparisons to other models or baselines.",
    
    }


def gisting_with_template(example, query_model, template, verebose=True):
    """ This takes in a function template of items that it wants to be
     sketched into separate focused 'gist' summaries about athat particular topic. 
     If a chunk has nothing to add to a a particular focus of the template, nothing is added to any subject-focused gist.

    """

        prompt_shorten_template = f"""
    Please shorten the following passage, focusing on the topic of {topic}, with some considerations such as the following
    
    {considerations}
    
    Just give me a shortened version if there is relevant information by saying
    
    {topic}: 

    and following it with the shortened text.
    
    DO NOT explain your reasoning or add unecessary information.

    Passage:
    {passage}

    """
    article = example['article']
    title = example['title']
    word_count = count_words(article)
    print(f"[Gisting][Article {title}], {word_count} words")
    pages = example['pages']
    gist = {key: [] for key in template.keys()}
    for i, page in enumerate(pages):
        for key, template_text in template.items():
            prompt = prompt_shorten_template.format(topic=key, considerations = template_text, passage='\n'.join(page))
            response = query_model(prompt)
            shortened_text = response.strip()
            if key in shortened_text:
                gist[key].append(shortened_text)
        # prompt = prompt_shorten_template.format(, '\n'.join(page))
        # response = query_model(prompt)
        # shortened_text = response.strip()
        # for key, template_text in template.items():
        #     if key in shortened_text:
        #         gist[key].append(shortened_text)
        if verbose:
            print("[gist] page {}:".format(i), shortened_text, flush=True)
    gist_word_count = {key: count_words(' '.join(value)) for key, value in gist.items()}
    if verbose:
        print("Shortened article:\n", gist, flush=True)
    # output = copy.deepcopy(example)
    # output.update({'title': title, 'word_count': word_count, 'gist_word_count': gist_word_count, 'gist': gist, 'pages': pages})
    # if verbose:
    #     print(f"compression rate {round(100.0 - sum(gist_word_count.values())/word_count*100, 2)}% ({sum(gist_word_count.values())}/{word_count})")
    return output