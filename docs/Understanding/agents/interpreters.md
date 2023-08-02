Interpreters facilitate model computation by parsing, formatting, or otherwise preparing the data for effective use. They can also be used to interpret output. 

Such efforts can be used to reduce input complexity, token-count, to detect potentially unreasonable inputs or outputs. These interpreters _may_ be agents or models themselves, thought that is not required. 

!!! example "Link Routing"
    A model may not be guaranteed to produce equivalent output based on a complex input string such as an html address. Consequently, pre-parsing the output and substituting a simple name for an address, such as 'html_1', and then re-introducing that within any output, both using RegEx, may enable more effective output. 

## References

### Input Interpreters

- [Strategic Reasoning with Language Models](https://arxiv.org/abs/2305.19165?utm_source=substack&utm_medium=email) Uses game trees and observed and inferred beliefs to achieve closer to optimal results. Powerful to consider for inferred beliefs and interacting in situations where negotiation or games are being played.
<img width="1008" alt="image" src="https://github.com/ianderrington/general/assets/76016868/5ffa0653-a323-44a6-bff5-b49e3be6091a">

- ‼️ [Rebuff](https://github.com/woop/rebuff) a prompt injection detection service.

### Output Interpreters

### Hybrid Interpreters

- ‼️ [Guardrails](https://shreyar.github.io/guardrails/) To help format output and prevent improper prompts.

- ‼️[Semantic Kernel](https://github.com/microsoft/semantic-kernel/blob/main/samples/notebooks/python/00-getting-started.ipynb), [Github](https://github.com/microsoft/semantic-kernel/tree/main)
