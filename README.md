# 🎉 Welcome to Managing Gen()AI!

See the [website](https://www.managen.ai)

**Our Mission**: Simplify and demystify Gen()AI to make it accessible and understandable and increase our ability to manage it.

Our **open-source project** on [**Managing Generative AI**](https://www.managen.ai) 🤖 will help people to stay on top of understanding and effectively working with the increasingly complex world of Generative AI.

## "Why is it called Gen() AI?"
`Generative AI` creates. So does will `General AI`. Depending on their definitions, there may be notable differences, but the overlap ensures that shared characteristics warrant writing this ambiguously, such as GenAI or Gen()AI.

## 📘 What's Inside?

- [**Understanding GenAI**](./Understanding/index.md): Delve deep into the mechanics, models, and methodologies for building GenAI.
- [**Building GenAI**](./Understanding/building/index.md): Learn how to build and deploy models.
- [**Using GenAI**](./Using/index.md): Where we describe use cases and applications, commercial tools and applications, and the ethics and regulations surrounding GenAI.
- [**Managing GenAI**](./Managenai/index.md): This is the heart of our project, where we describe the tools that we are building to enable quality and responsible development of this and other AI projects.

## 🚀 GenAI Explaining Itself?

One of our ambitious goals is to have this documentation written and updated by **GenAI itself**. We aim to:

- 📝 Set up a **base documentation repository** that aids in generating self-descriptive content.
- 🔄 Implement an **automated merge and build system** for a seamless automation and viewing experience.
- 🔁 Create a **self-referential models** using tools like Langchain to enable its supervised self-improvement via pull requests and reviews.
- 🕸️ Catch the greatest new insights and integrate it into a 'living' document that evolves with time.

We believe in Gen()AI's potential to effectively **explain itself** even as the technology grows with extreme complexity.

If you're as excited as we are and wish to contribute, join us!

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

If you want to continually edit and see how the changes impact the outcome

```bash
mkdocs build; mkdocs serve --livereload
```

## Contributing

We welcome contributions! Please check out the [contributing guidelines](contributing.md) to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
