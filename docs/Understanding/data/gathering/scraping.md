# Data Scraping

Data scraping is the process of automatically extracting information from various sources, typically websites, documents, or other digital formats. This technique is essential for gathering large amounts of data that would be impractical to collect manually.


## Common Scraping Methods

1. **Web Scraping**
   - HTML parsing
   - API consumption
   - Browser automation
   
2. **Document Scraping**
   - PDF extraction
   - Image text extraction (OCR)
   - Document format conversion

3. **Database Scraping**
   - Direct database queries
   - Export file processing
   - Log file analysis

## Tools and Libraries

### General-Purpose Tools



??? abstract "[Scrapegraph AI](https://github.com/ScrapeGraphAI/Scrapegraph-ai)"
    ScrapeGraphAI is a powerful Python library that leverages LLMs and direct graph logic for web scraping. It can extract information from both websites and local documents (XML, HTML, JSON, Markdown) using natural language prompts. Key features include:

    - Multiple scraping pipelines (single-page, multi-page, search-based)
    - Support for various LLMs (OpenAI, Groq, Azure, Gemini, Ollama)
    - Audio generation from scraped content
    - Python script generation for custom scraping
    - Parallel LLM processing capabilities
    - Built-in browser automation with Playwright

#### Web Scraping
- BeautifulSoup
- Scrapy ([Website](https://scrapy.org/) | [GitHub](https://github.com/scrapy/scrapy))
- Selenium
- Puppeteer

#### Document Scraping
- MinerU
- Apache Tika
- Tabula
- PyMuPDF

!!! tip "MinerU for Document Extraction"
    [MinerU](https://github.com/opendatalab/MinerU) is a powerful open-source tool specifically designed for high-quality PDF extraction. It excels at:
    - Converting PDFs to machine-readable formats (Markdown, JSON)
    - Preserving document structure (headings, paragraphs, lists)
    - Extracting images, tables, and formulas
    - Supporting multiple languages through OCR
    - Handling complex layouts and scientific literature

### LLM-Specific Tools

Several specialized tools have been developed specifically for gathering and processing data for Large Language Models:

#### Code Repository Processing
??? abstract "https://github.com/cyclotruc/gitingest"
    [gitingest](https://github.com/cyclotruc/gitingest) - Replace 'hub' with 'ingest' in any GitHub URL to get a prompt-friendly extract of a codebase.

??? abstract "https://github.com/yamadashy/repomix"
    [repomix](https://github.com/yamadashy/repomix) - Packs your entire repository into a single, AI-friendly file

??? abstract "https://github.com/simonw/files-to-prompt"
    [files-to-prompt](https://github.com/simonw/files-to-prompt) - Concatenates a directory of files into a single LLM-ready prompt

??? abstract "https://github.com/Doriandarko/RepoToTextForLLMs"
    [RepoToTextForLLMs](https://github.com/Doriandarko/RepoToTextForLLMs) - Simple Python script for fetching repository content

#### Web Content Processing
??? abstract "https://github.com/mishushakov/llm-scraper"
    [llm-scraper](https://github.com/mishushakov/llm-scraper) - Converts webpages into structured data using LLMs

??? abstract "https://github.com/unclecode/crawl4ai"
    [crawl4ai](https://github.com/unclecode/crawl4ai) - LLM-friendly web crawler and scraper

??? abstract "https://github.com/jina-ai/reader"
    [reader](https://github.com/jina-ai/reader) - Convert any URL to LLM-friendly input using https://r.jina.ai/

??? abstract "https://github.com/mendableai/firecrawl"
    [firecrawl](https://github.com/mendableai/firecrawl) - API to convert websites into LLM-ready markdown or structured data
    
    **MCP Server Implementation**: [firecrawl-mcp-server](https://github.com/mendableai/firecrawl-mcp-server)
    
    Features:
    - Scraping single URLs with advanced options (formats, content filtering, timeouts)
    - Batch scraping with parallel processing and rate limiting
    - Web search with content extraction
    - Crawling with depth control and link filtering
    - Structured data extraction using LLMs
    - Credit usage monitoring and rate limit handling
    
    Configuration options:
    - Retry behavior with exponential backoff
    - Credit usage thresholds for warnings
    - Custom API endpoints for self-hosted instances
    - Batch processing parameters
    
    Available Tools:
    - `firecrawl_scrape`: Single URL scraping
    - `firecrawl_batch_scrape`: Multiple URL processing
    - `firecrawl_search`: Web search with content extraction
    - `firecrawl_crawl`: Deep crawling with controls
    - `firecrawl_extract`: Structured data extraction
    
    Integrates with:
    - Cursor
    - Claude
    - Other LLM clients supporting Model Context Protocol (MCP)

??? abstract "https://github.com/mendableai/llmstxt-generator"
    [llmstxt-generator](https://github.com/mendableai/llmstxt-generator) - API to generate llms.txt files from websites

#### Document Processing
??? abstract "https://github.com/VikParuchuri/marker"
    [marker](https://github.com/VikParuchuri/marker) - Fast PDF to markdown or JSON conversion

??? abstract "https://github.com/adbar/trafilatura"
    [trafilatura](https://github.com/adbar/trafilatura) - Python & CLI tool for web text and metadata extraction

??? abstract "https://github.com/DS4SD/docling"
    [docling](https://github.com/DS4SD/docling) - Simplifies processing and parsing of diverse document formats

## Scraping Practices

1. **Respect Rate Limits**
    - Implement delays between requests
    - Follow robots.txt guidelines
    - Use appropriate request headers

2. **Data Validation**
    - Verify extracted data integrity
    - Handle missing or malformed data
    - Implement error logging

3. **Performance Optimization**
    - Use async operations when possible
    - Implement proper caching
    - Consider distributed scraping for large datasets


## Additional Resources

For additional resources and datasets specifically focused on post-training, refer to:
- [llm-datasets](https://github.com/mlabonne/llm-datasets) - Curated list of datasets and tools for LLM post-training
- [LLM Data Scrapers Repository](https://github.com/patrickloeber/llm-data-scrapers) - Collection of useful Open Source tools and scrapers for LLMs
