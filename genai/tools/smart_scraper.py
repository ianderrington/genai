# %%
from scrapegraphai.graphs import SmartScraperGraph

graph_config = {
    "llm": {
        "model": "ollama/mistral",
        "temperature": 0,
        "format": "json",  # Ollama needs the format to be specified explicitly
        "base_url": "http://localhost:11434",  # set Ollama URL
    },
    "embeddings": {
        "model": "ollama/nomic-embed-text",
        "base_url": "http://localhost:11434",  # set Ollama URL
    }
}

smart_scraper_graph = SmartScraperGraph(
    prompt="Please list all the articles. Please be sure to look for html like <card 'some_features'> <card-body>, <card-img-top> ",
    # also accepts a string with the already downloaded HTML code
    # source="https://whataicandotoday.com/",
    # source="https://awesomeaitools.com/",
    source="https://aitoptools.com",
    config=graph_config
)

result = smart_scraper_graph.run()
print(result)


