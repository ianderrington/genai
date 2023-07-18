# GenAI 

GenAI is a self-documenting AI system that leverages generative models to expand its own documentation and capabilities.

## Overview

The goal is to create an AI that can self-improve its documentation and code using tools like [Langchain](https://langchain.com/), [AutoPR](https://github.com/autopr/autopr), etc. 

It will automatically expand markdown documentation using generative models. The AI will also suggest code improvements to streamline documentation generation. This creates a self-referential system that enhances both docs and code.

We want to keep a human in the loop to oversee changes and provide feedback for further improvements.

## Getting Started

- Clone the repo: 

```bash
git clone https://github.com/ianderrington/genai.git
```

- Install dependencies: 

```bash
pip install -r requirements.txt
```

- Build documentation: 

```bash
mkdocs serve
```

- View docs site locally at http://127.0.0.1:8000

## Contributing

We welcome contributions! Please check out the [contributing guidelines](CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




