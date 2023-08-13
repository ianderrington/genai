Interpreters facilitate model computation by parsing, formatting, or otherwise preparing the data for effective use. They can also be used to interpret output. 

Such efforts can be used to reduce input complexity, token-count, to detect potentially unreasonable inputs or outputs. These interpreters _may_ be agents or models themselves, thought that is not required. 

!!! example "Link Routing"
    A model may not be guaranteed to produce equivalent output based on a complex input string such as an html address. Consequently, pre-parsing the output and substituting a simple name for an address, such as 'html_1', and then re-introducing that within any output, both using RegEx, may enable more effective output. 

## Tools
Please see the [frameworks and tools](../../Engineering/frameworks_and_tools.md) for a more comprehensive set, but below are a few examples.
 
- [Guardrails](https://shreyar.github.io/guardrails/) To help format output and prevent improper prompts.

- [Semantic Kernel](https://github.com/microsoft/semantic-kernel/blob/main/samples/notebooks/python/00-getting-started.ipynb), [Github](https://github.com/microsoft/semantic-kernel/tree/main)

- ️[Guidance](https://github.com/microsoft/guidance/) Interleaving generation, prompting and logical control to single  continuous flow.
