
# Write commercial_markets.md
cat << 'EOF' > Using/commercial_markets.md
### Advising Companies

Companies advising individuals and companies on the effective adoption of information are a niche but powerful market. They offer the potential to improve automation, reduce time and costs, or expand markets and allow people and companies to do more.

They range from small-boutique companies to bigger consulting companies, including Deloitte, IBM, and many others.

Here is a list of companies:

### Educational

### Boutique
- [Synthminds](https://www.synthminds.ai/)
- [GPTNavigator Pro](https://gptnavigatorpro.com/)

Future: In the future, we intend to automate the empirically validated quality of these companies, using user-feedback portals and aggregates. This also offers a potential sponsorship model for the Managen Consortium.
EOF

# Write business.md
cat << 'EOF' > Using/business.md
## State of the stack

- [Menlo Ventures Summary (2024-Jan)](https://menlovc.com/perspective/the-modern-ai-stack-design-principles-for-the-future-of-enterprise-ai-architectures/)

## Business Models

Revenue Models 

### Monthly user

Pros:
Cons: Super-users may 

### Link-referencing

The responses form LLM models can embed links, allowing an advertiser-based revenue model. 

Pros: 
Cons: 

??? abstract "[Manipulating Large Language Models to Increase Product Visibility](https://github.com/aounon/llm-rank-optimizer)"
    Our work opens up a new field at the intersection of large language models (LLMs) and e-commerce, which we refer to as LLM-based Search Optimization (LSO).  
    [paper](https://arxiv.org/abs/2404.07981)

## Good References

[Professor Synapse](https://www.youtube.com/watch?v=pFPZFmOTgtA&t=232s)

## Embeddings-as-a service
It seems that outputting the embeddings. 

While next-token generation is immediately useful and valuable, [embeddings](../Understanding/architectures/models/index.md#embeddings) provide value in enabling vector-based [memory](../Understanding/agents/memory.md) that enable more effective generations.

https://github.com/amansrivastava17/embedding-as-service
EOF

# Write governing.md
cat << 'EOF' > Using/governing.md
# AI Governance

!!! quote "[From PECB](https://pecb.com/article/navigating-iso-standards-and-ai-governance-for-a-secure-future)"
    AI governance ensures ethical, safe, and responsible development and deployment of artificial intelligence technologies. It encompasses a set of rules, standards, and processes that guide AI research and applications, aiming to protect human rights and promote fairness, accountability, and transparency. 

Governance helps to ensure AI systems are ethical, consistent with individual, company and societal principles, value-producing with successful results that benefit customers and businesses, and compliant: adherent to local, regional, national, and international laws. 

Effective governance at appropriate institutional levels will _improve_ results, while minimizing risks to customers and businesses. The challenge is in understanding what is right for your business. 

## Common Elements in AI Governance

### Ethics: Principles to aim towards
Core elements in AI governance require ethics to guide AI governance. While there are many variations surrounding these, from sources such as [this one](https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/resource-for-organisation/ai/sgmodelaigovframework2.pdf), they can include considerations such as the following:

1. Human-centric: Amplifies the capabilities and protects the interests of people. 
2. Transparency: All aspects of the AI system and its development are thoughtfully described and documented.
3. Fairness: Equitable and beneficial for all
4. Explainability: The AI's results can be understood and reproduced
5. Sustainability: Minimizes environmental impact
6. Accountability: Enabling actions to be taken to prevent future failures
7. Observability: Allows one to observe the AI to be evaluated
8. Positive Impact: Creates positive value for all parties
9. Private: Appropriately protects the privacy rights of people
10. Secure: Cannot be misused intentionally or unintentionally

### Responsible Development and Monitoring

#### Risk identification and Mitigation 
!!! note "Risk severity table from [here](https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/resource-for-organisation/ai/sgmodelaigovframework2.pdf)"
    <img width="329" alt="image" src="https://github.com/user-attachments/assets/ccd3c12d-2652-46f5-8044-61e275c7f290">

#### Lifecycle Maintenance

#### Observability

#### Feedback

## What Governance looks like
There are a number of resources all around the internet that may facilitate in understanding what should be done. One example is the [AI-Governance](https://ai-governance.eu/) provides an example 'Hourglass Model' for organizations to organize their AI

!!! important "[The Hourglass Model](https://ai-governance.eu/ai-governance-framework/the-hourglass-model/)"
    ![image](https://github.com/user-attachments/assets/cc587b6b-23b5-4c19-a227-fcaeb9dcebcc)

The different components have associated tasks, which we take from [here](https://arxiv.org/pdf/2206.00335), helps to identify the different tasks that should be done throughout the lifecycle of AI products.

??? note "[Governance Lifecycle](https://ai-governance.eu/ai-governance-framework/the-ai-governance-lifecycle/)"
    ![image](https://github.com/user-attachments/assets/0bc28dcd-125b-4879-a723-7bd98e3d66d0)

These actions are described here

??? note "[AI Governance To Do List](https://ai-governance.eu/ai-governance-framework/task-list/)"
    ```markdown
    ## A. AI System
    T1. AI system repository and ID
    T2. AI system pre-design
    T3. AI system use case
    T4. AI system user
    T5. AI system operating environment
    T6. AI system architecture
    T7. AI system deployment metrics
    T8. AI system operational metrics
    T9. AI system version control design
    T10. AI system performance monitoring design
    T11. AI system health check design
    T12. AI system verification and validation
    T13. AI system approval
    T14. AI system version control
    T15. AI system performance monitoring
    T16. AI system health checks
    ## B. Algorithms
    T17. Algorithm ID
    T18. Algorithm pre-design
    T19. Algorithm use case design
    T20. Algorithm technical environment design
    T21. Algorithm deployment metrics design
    T22. Algorithm operational metrics design
    T23. Algorithm version control design
    T24. Algorithm performance monitoring design
    T25. Algorithm health checks design
    T26. Algorithm verification and validation
    T27. Algorithm approval
    T28. Algorithm version control
    T29. Algorithm performance monitoring
    T30. Algorithm health checks
    ## C. Data operations
    T33. Data pre-processing
    T34. Data quality assurance
    T31. Data sourcing
    T32. Data ontologies, inferences, and proxies
    T35. Data quality metrics
    T36. Data quality monitoring design
    T37. Data health check design
    T38. Data quality monitoring
    T39. Data health checks
    ## D. Risk and impacts
    T40. AI system harms and impacts pre-assessment
    T41. Algorithm risk assessment
    T42. AI system health, safety and fundamental rights impact assessment
    T43. AI system non-discrimination assurance
    T44. AI system impact minimization
    T45. AI system impact metrics design
    T46. AI system impact monitoring design
    T49. TEC expectation canvassing
    T50. TEC design
    T47. AI system impact monitoring
    T48. AI system impact health check
    ## E. Transparency, explainability and contestability (TEC)
    T51. TEC monitoring design
    T52. TEC monitoring
    T53. TEC health checks
    ## F. Accountability and ownership
    T54. Head of AI
    T55. AI system owner
    T56. Algorithm owner
    ## G. Development and operations
    T57. AI development
    T58. AI operations
    T59. AI governance integration
    ## H. Compliance
      T60. Regulatory canvassing
      T61. Regulatory risks, constraints, and design parameter analysis
      T62. Regulatory design review
      T63. Compliance monitoring design
      T64. Compliance health check design
      T65. Compliance assessment
      T66. Compliance monitoring
      T67. Compliance health checks
    ```

## AI Governance Stakeholders
There are numerous and varied stakeholders that may be a part of any governance solution. Here is a general list that will necessarily vary depending on business structure:

1. C-Suite level:
  - CIO - Chief Information Officer
  - CISO - Chief Information Security Officer
  - CPO

 - Chief Privacy Officer
  - CDO - Chief Data Officer
6. Legal - Ensuring AI Compliance and security
7. Communication - Presenting internal and external representations of stances towards AI 
8. System or application owner(s) - Those building overall products
9. Software Architects and Developers
10. AI/ML Engineers and Researchers - Creating AI solutions 
11. Data Scientists and Domain Experts - Helping to understand enable Data for use in AI systems
12. UX - User Interfacing and  Experience
13. Users - Those who use the AI
EOF

# Write index.md
cat << 'EOF' > Using/index.md
# Using Gen()AI (GENAI)

This guide provides strategic insights into effectively managing GenAI, focusing on fostering innovation and productivity while adapting to the evolving technology landscape. 

## Executive Summary (TL;DR)

Managing GenAI effectively requires a strategic approach that aligns with your business operations and culture. Two primary methods are discussed: the task-focused approach and the solution-focused approach. The task-focused approach involves analyzing tasks performed by your company's employees and identifying opportunities for AI assistance or automation. The solution-focused approach, on the other hand, involves identifying the needs of your teams and exploring how GenAI can address these needs. 

## Strategy 
The strategy for using Generative AI can be broken down into several categories based on how it might be considered. It is first important to consider [value generation](#value-generation), 

### Value Generation 

There are several strategic methods for incorporating GenAI into teams and organizations. We break it down into [task focused approach](#task-focused-approach), a [solution focused approach](#solution-focused-approach) and a more diverse [wild-west-approach](#wild-west-approach). In some instances it may be useful to consider all strategic approaches, and both time and scale will help understand more efficient strategies. 

#### Task-Focused Approach
A task-focused approach  breaks down an employee's efforts into individual tasks to identify patterns that can be effectively augmented with GenAI. The general approach follows the following steps: 

1. Break down the jobs of your company's employees into individual tasks. [See examples](examples/by_modality/index.md).
2. Identify potential for AI assistance or automation for each task using tools such as supervised learning or generative AI.
3. Estimate the value of automating each task, considering factors such as potential time or resource savings, and the ethical implications of doing so. [See ethical considerations](ethically/index.md).
4. Decide whether to build or buy the necessary AI tools, and calculate the costs of automating the tasks. [See building or buying guide](building_or_buying.md).
5. Prepare to govern the use of AI in your operations. [See governing guide](managing/governing.md).

#### Solution-Focused Approach

A solution focused approach considers business needs and what needs to be accomplished to meet those business needs. Implementing a solution-focused approach involves the following steps:

1. Engage your teams in discussions about how they would like to utilize GenAI, considering different examples of its use. [See examples](examples/index.md).
2. Understand the common use-cases required by your various employees and teams.
3. Decide whether to build or buy the necessary AI tools. [See building or buying guide](building_or_buying.md).
4. Ensure your efforts align with the important ethical considerations of using GenAI. [See ethical considerations](ethically/index.md).
5. Prepare to manage the use of AI in your operations. [See managing guide](managing/index.md).
6. Learn how to mark your, and detect others', AI-generated content. [See marking and detecting guide](marking_and_detecting.md).

#### Wild-west Approach

A 'wild-west' approach involves allowing individual teams and developers to work on their own use-cases and needs so that their problems may be more effectively solved on reasonable timescales and timelines. While there may be different manners and methods of achieving similar results, detailed nuances may be built into their solutions that are hard to immediately incorporate in general solutions. When there are solutions that are found that may share a high-degree of similarity or overlap, it will be economical to consolidate components of those solutions, including components such as [LLM computation](../Understanding/building/computation.md), [back ends](../Understanding/building/back_end.md) and [orchestration](../Understanding/building/orchestrating.md) frameworks, and [front-ends](../Understanding/building/front_end.md). 

This 'strategy' has the benefits of potentially providing immediate solutions, as well as allowing competitive selection of optimal solutions, it is generally not possible in smaller organizations or teams, and more collaborative strategies will likely be necessary to maintain efficiency and coherence over time. 
EOF

# Write de-risking/alignment.md
cat << 'EOF' > Using/de-risking/alignment.md
Raw generative models do not generally produce globally accurate outputs given input prompts. 

This is due to the manner of training and next-word-prediction (or more arbitrary masked-word prediction) is probabilistically 'greedy'. Namely, within a sampling of outputs, the next-prediction will be sampled based on their _immediate_ likelihood. To improve the outputs, the models are further refined using various approaches. These approaches 'align' the output to accurately considered 

Global alignment 

## References

- [OpenAI's approach to alignment research](https://openai.com/blog/our-approach-to-alignment-research)
EOF

# Write de-risking/explainability.md
cat << 'EOF' > Using/de-risking/explainability.md
Explainability can be very useful in anticipating failures identifying solutions to GenAI models and their effective alignment.

!!! important "[Transformer Debugger, but OpenAI Superalignment's team](https://github.com/openai/transformer-debugger?) provides an important tool to answer the question 'Why' a model acted in certain ways.
EOF

# Write de-risking/index.md
cat << 'EOF' > Using/de-risking/index.md
## Notable groups working to de-risk elements related to AI

!!! note "[Google Project Zero](https://googleprojectzero.blogspot.com/)
EOF

# Write de-risking/marking_and_detecting.md
cat << 'EOF' > Using/de-risking/marking_and_detecting.md
It is increasingly apparent that the gap between content created by people and by AI is closing. In fact [Open AI](https://arstechnica.com/information-technology/2023/09/openai-admits-that-ai-writing-detectors-dont-work/) confirms this. There are challenges with false-positive detections where person-created content, like the [Constitution of the United States](https://arstechnica.com/information-technology/2023/07/why-ai-detectors-think-the-us-constitution-was-written-by-ai/) have been inappropriately attributed to AI.

This is likely going to be worse as AI can be used to mimic the style of individuals, through fine-tuning, multi-shot prompting, etc.

That said, there are a few detectors that might be useful in understanding content's origin -- they just need to be used with a degree of uncertainty.

Here are a few:

- [Sapling AI content detector](https://sapling.ai/ai-content-detector)
EOF

# Write de-risking/red_teaming.md
cat << 'EOF' > Using/de-risking/red_teaming.md
# Red Teaming in AI

Generative models are primarily designed to predict the next token. However, this does not necessarily ensure that the model will excel in generating text that aligns with external requirements.

While standard testing may help identify flaws within the test sets, and fixes can be incrementally developed to address these flaws, such as with Reinforcement Learning from Human Feedback (RLHF), red-teaming aims to identify ways in which behaviors that are identified as misaligned can be successfully extracted by manipulating the model's inputs.

!!! quote "Definitions"
    **Red-teaming** is a form of evaluation that uncovers model vulnerabilities that could lead to undesirable behaviors. ^N1
    **Jailbreaking** is another term for red-teaming where the Language Model (LLM) is manipulated to bypass its guardrails." ^N1

## Red Teaming Approaches

Red teaming can be conducted through manual or automated approaches. Each has its own advantages and can be chosen based on the specific requirements and constraints of the project.

### Manual Approaches

Manual red teaming involves human testers who attempt to exploit the vulnerabilities of the AI model. This approach allows for creative and unpredictable testing scenarios that may not be covered by automated methods. However, it can be time-consuming and may not be feasible for large-scale models.

### Automated Approaches

Automated red teaming uses programmed scripts or tools to test the AI model. This approach can cover a wide range of scenarios in a short amount of time, making it suitable for large-scale models. However, it may not be able to cover as many unique and creative scenarios as manual testing.

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/sherdencooper/prompt-injection) [Custom GPT Security Analysis](https://github.com/sherdencooper/prompt-injection) provides research and systems to use adversarial prompts to evaluate GPT's"
   <img width="575" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4b99aae5-4f96-4f37-a30a-6c214a379a4d">
   [Paper](https://arxiv.org/pdf/2311.11538.pdf)

## Attack methods

### Divergence Attacks

??? note "[Scalable Extraction of Training Data from (Production) Language Models](https://arxiv.org/pdf/2311.17035.pdf)"
   "Develop

ed a new divergence attack that causes the model to diverge from its chatbot-style generations and emit training data at a " high rate.

## Further Reading

For more information on red teaming in AI, consider the following resources:

^N1: [Hugging Face](https://huggingface.co/blog/red-teaming)
EOF

# Write de-risking/security.md
cat << 'EOF' > Using/de-risking/security.md
Security of LLM's is multi fold. For security of the data, security of the models, and security of prompts. One is that the improper use of the models while under the control of the models, the other is for the theft of model information to the model itself. 

Security for LLMs involves the protection of proprietary information, or personal identifiable information (PII) that is used in creation or deployment of a model.

### Demonstrations

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/jxmorris12/vec2text) [Text Embeddings Reveal (Almost) As Much As Text](https://github.com/jxmorris12/vec2text) uses a multistep method to recover a large amount of the original text used to create an embedding."
    [Paper](https://arxiv.org/pdf/2310.06816.pdf)
    Wherein the authors introduce Vec2text, a method that can accurately recover (short) texts, given access to an embedding model.
    This means that while those high-dimensional embedding vectors can be used to reconstructed the text that led to them.
    This includes important personal information (as in from a dataset of clinical notes).

## To Integrate

-[Breaking Down the Defenses: A Comparative Survey of Attacks on Large Language Models](https://arxiv.org/pdf/2403.04786.pdf)
EOF

# Write ethically/alignment.md
cat << 'EOF' > Using/ethically/alignment.md
Raw generative models do not generally produce globally accurate outputs given input prompts. 

This is due to the manner of training and next-word-prediction (or more arbitrary masked-word prediction) is probabilistically 'greedy'. Namely, within a sampling of outputs, the next-prediction will be sampled based on their _immediate_ likelihood. To improve the outputs, the models are further refined using various approaches. These approaches 'align' the output to accurately considered 

Global alignment 

## References

- [OpenAI's approach to alignment research](https://openai.com/blog/our-approach-to-alignment-research)
EOF

# Write ethically/alignment_and_existential_concerns.md
cat << 'EOF' > Using/ethically/alignment_and_existential_concerns.md
TODO: This section needs complete remodeling.

There is a notable degree of concern for the potential for Generative, and eventually General AI, to cause harm. The harm can occur either accidentally or to the intentional use of GenAI.

There is also self-existential concerns related to GenAI models themselves. This is found due to the potential that when models are trained on data that is produced by other
models, there can be a degradation in performance, known as _model collapse_.

## Background

## Jail breaking
### Prompting
### Fine-tune compromising
!!! note "[Fine-tuning Aligned Language Models Compromises Safety, Even When Users Do Not Intend To!](https://llm-tuning-safety.github.io/) reveals that a few adversarial examples can break alignment when finetuned."

## Alignment with People

- [Personal Universes: A Solution to the Multi-Agent Value Alignment Problem](https://arxiv.org/pdf/1901.01851.pdf)

## Alignment with GenAI
EOF

# Write ethically/dual_use_concerns.md
cat << 'EOF' > Using/ethically/dual_use_concerns.md
The potential for AI to generate _beneficial_ results or outcomes is very promising. At the same time, however, AI can be intentionally used for _harmful_ outcomes. Such is known as a **dual-use** concern.
This has been found in a number of research articles, and quite prominently when working to evaluate the safety of [drug discovery](https://www.nature.com/articles/s42256-022-00465-9)
EOF

# Write ethically/fairness.md
cat << 'EOF' > Using/ethically/fairness.md
## Elements of AI Fairness
Understanding AI fairness can be complex, but let's break it down into simple, digestible elements.

### 1. Understanding Bias
Bias in AI systems comes from various sources. It could be in the data used to train the AI, the design of the AI algorithms, or the ways AI systems are deployed and used. AI fairness, therefore, needs to address these sources of bias.

Data Bias: This happens when the data used to train the AI is not representative of the population it will be serving, leading to biased predictions or decisions. An example is if an AI system was trained on data mostly from one demographic group, it might not perform well on other groups.

Algorithmic Bias: This is when the algorithms that power AI systems inherently favor one outcome over another. They might do this due to design flaws, biased inputs, or even the optimization goals set by their creators.

### 2. Fairness Metrics
Measuring fairness is a crucial aspect of AI fairness. This involves setting and monitoring fairness metrics that determine how well an AI system is performing in terms of fairness.

Disparity Metrics: Measures how an AI's decisions or predictions differ among various demographic groups.

Equality Metrics: Measures how equally an AI system treats individuals, regardless of their demographic group.

### 3. Transparency
Transparency is about making sure the workings of an AI system are understandable to people. This includes both the technical side (e.g., how the AI's algorithms work) and the practical side (e.g., how decisions made by the AI impact individuals).

Explainability: AI systems should be designed to provide explanations about their decisions or predictions. This helps individuals understand how a system came to a certain conclusion.

Interpretability: This involves designing AI systems in ways that their workings can be understood by humans, even if they don't have technical expertise in AI.

### 4. Accountability
Accountability in AI fairness refers to the obligation of AI system developers and operators to answer for the system's effects on individuals and society.

Auditing: Regular checks on an AI system's decisions and performance to ensure it's upholding fairness standards.

Redress Mechanisms: Clear pathways for people to challenge decisions made by an AI system, particularly if they believe they've been treated unfairly.

### 5. Inclusion
Inclusion is about making sure AI systems serve all individuals fairly and equitably, regardless of their demographic characteristics.

Diversity in Design: This involves ensuring that the teams creating AI systems are diverse, which can help to avoid some forms of bias and make the systems more effective for a wider range of individuals.

Accessibility: AI systems should be designed in ways that they can be used and understood by people with varying abilities, languages, and cultural contexts.

NOTE: Generated with GPT-4
EOF

# Write ethically/index.md
cat << 'EOF' > Using/ethically/index.md
!!! quote "Be sure to consider the unintended consequences."
    - Sundar Pichai, Google's CEO

Core elements in AI governance require ethics to guide AI governance. While there are many variations surrounding these, from sources such as [this one](https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/resource-for-organisation/ai/sgmodelaigovframework2.pdf), they can include considerations such as the following:

1. Human-centric: Amplifies the capabilities and protects the interests of people. 
2. Transparency: All aspects of the AI system and its development are thoughtfully described and documented.
3. Fairness: Equitable and beneficial for all
4. Explainability: The AI's results can be understood and reproduced
5. Sustainability: Minimizes environmental impact
6. Accountability: Enabling actions to be taken to prevent future failures
7. Observability: Allows one to observe the AI to be evaluated
8. Positive Impact: Creates positive value for all parties
9. Private: Appropriately protects the privacy rights of people
10. Secure: Cannot be misused intentionally or unintentionally

## Bias and Fairness

### Mitigating Bias in Data and Models
Ensuring that data and models are free from bias is crucial for ethical AI. Techniques such as data augmentation, re-sampling, and fairness constraints can help mitigate bias.

### Evaluating Model Fairness
Regularly evaluate models for fairness using metrics like demographic parity, equalized odds, and disparate impact. Tools like Fairness Indicators can assist in this process.

### Inclusive Model Development
Involve diverse teams in the model development process to ensure a variety of perspectives and reduce the risk of bias.

### Transparency and Explainability
Make models transparent and explainable to build trust and allow users to understand how decisions are made. Techniques like LIME and SHAP can help in explaining model predictions.

## Interpretability

### Techniques for Explainability
Use methods such as feature importance, partial dependence plots, and surrogate models to make AI systems more interpretable.

### Right to Explanation
Ensure that users have the right to understand how decisions affecting them are made, in compliance with regulations like GDPR.

### Safety
Implement safety measures to prevent harm from AI systems, including robust testing and validation.

## Risk Mitigation

### Risk Assessment
Conduct thorough risk assessments to identify potential issues and mitigate them before deployment.

### Safeguards Against Misuse
Implement safeguards to prevent the misuse of AI technologies, such as access controls and monitoring.

### Privacy
Ensure that AI systems respect user privacy by incorporating privacy-preserving techniques.

## Data Privacy

### Anonymization and De-identification
Use anonymization and de-identification techniques

 to protect user data while still allowing for meaningful analysis.

### Encryption and Secure Computing
Implement encryption and secure computing practices to protect data at rest and in transit.

## Governance

### Internal Auditing Processes
Establish internal auditing processes to regularly review AI systems for compliance with ethical guidelines.

### External Oversight
Engage external auditors to provide an objective review of AI systems and practices.

### Accountability Measures
Implement accountability measures to ensure that individuals and teams are responsible for the ethical use of AI.

## Access and Inclusion

### Fair and Equitable Access
Ensure that AI technologies are accessible to all, regardless of socioeconomic status or geographic location.

### Digital Divides
Work to bridge digital divides by providing resources and support to underserved communities.

### Participatory Design
Involve end-users in the design process to ensure that AI systems meet their needs and are usable by all.

## Compliance

### Laws and Regulations
Stay informed about and comply with relevant laws and regulations governing AI use.

### Responsible Development Guidelines
Follow responsible development guidelines to ensure ethical AI practices.

### Ethics Review Processes
Implement ethics review processes to evaluate the potential impact of AI systems before deployment.

!!! abstract "[Some questionable or fraudulent practices in ML](https://arxiv.org/pdf/2407.12220)"

## To Sort

### Unlearning
Explore techniques for unlearning in AI systems to remove biases or incorrect information. [Unlearning Saliency](https://github.com/optml-group/unlearn-saliency)

### Principles and Guidelines
Key principles of the living guidelines:

First, the summit participants agreed on three key principles for the use of generative AI in research — accountability, transparency, and independent oversight.

#### Accountability
Humans must remain in the loop to evaluate the quality of generated content; for example, to replicate results and identify bias. Although low-risk use of generative AI — such as summarization or checking grammar and spelling — can be helpful in scientific research, we advocate that crucial tasks, such as writing manuscripts or peer reviews, should not be fully outsourced to generative AI.

#### Transparency
Researchers and other stakeholders should always disclose their use of generative AI. This increases awareness and allows researchers to study how generative AI might affect research quality or decision-making. In our view, developers of generative AI tools should also be transparent about their inner workings, to allow robust and critical evaluation of these technologies.

#### Independent Oversight
External, objective auditing of generative AI tools is needed to ensure that they are of high quality and used ethically. AI is a multibillion-dollar industry; the stakes are too high to rely on self-regulation.

??? abstract "[OWASP](https://owasp.org/www-project-top-10-for-large-language-model-applications/)"
    The OWASP Top 10 for Large Language Model Applications project aims to educate developers, designers, architects, managers, and organizations about the potential security risks when deploying and managing Large Language Models (LLMs). The project provides a list of the top 10 most critical vulnerabilities often seen in LLM applications, highlighting their potential impact, ease of exploitation, and prevalence in real-world applications. Examples of vulnerabilities include prompt injections, data leakage, inadequate sandboxing, and unauthorized code execution, among others. The goal is to raise awareness of these vulnerabilities, suggest remediation strategies, and ultimately improve the security posture of LLM applications. You can read our group charter for more information
EOF

# Write ethically/transparency.md
cat << 'EOF' > Using/ethically/transparency.md

EOF

# Write managing/governing.md
cat << 'EOF' > Using/managing/governing.md
Governing is an essential component to effective AI usage, especially within large organizations or when the use of AI for a product has greater potential to cause harm in its design. Applications of AI need to be evaluated based on their risk to do harm and be used ethically.

## Why govern?

In order to have the greatest potential positive impact in your use of AI, governance is essential. The larger the organization, the greater the importance of governance to help minimize needlessly duplicated internal systems and efforts. Even for smaller organizations, effective governance from the beginning will enable your organization to more reasonably create and deliver effective and responsible AI-enabled solutions.

## How to Govern

1. Establish an appropriate body of leadership and a surrounding community that supports the development of AI that is both responsible and effective.
2. Create or adopt a set of _AI principles_ that align with your company,
3. Create or adopt a set of procedures for creating, evaluating, and managing your AI systems.
4. Create, license, or otherwise use AI [_ML ops](ml_ops.md) [_observability_](./observability.md) platforms/tools that you will use to implement and maintain AI-enabled projects that is consistent with your procedures and principles.
5. Transparently communicate the development and status of your AI-enabled system with internal and regulatory bodies.

## Preparedness

It is possible, if not likely, that more powerful Generative and General AI will come about. Consequently, it is essential to prepare for it in such a way to scientifically and effectively mitigate any potential risks, including catastrophic risks.  As part of this OpenAI has established a [preparedness framework](https://cdn.openai.com/openai-preparedness-framework-beta.pdf) that they are working with. Other companies may wish to follow suit. This framework, in summary, considers three things. 
1. The categories and classes of risk.
2. A scorecard model that indicates the level and class of risks
3. The governance to minimize risks enable effective action upon risk emergence or identification

### Categories and classes of risks

The classes of risk are mentioned as the following. 
1. Low
2. Medium
3. High
4. Critical

The meaning of these classes depend on the categories and are thoroughly described in the [framework](https://cdn.openai.com/openai-preparedness-framework-beta.pdf)

The categories are partitioned into the following:
1. Cybersecurity
2. Chemical, biological, radiological and nuclear (CBRN)
3. Persuasion
4. Model Autonomy
5. Unknown unknowns

### Score cards

These Describe the risks + categories before and after risk mitigation

### Governance 

Governance consists of 
** Safety baselines**: 

- Asset Protection
- Deployment restrictions
- Development restrictions

**Operations:**
An operational structure that coordinates actions and activities of a _Preparedness team_ , a Safety Advisory Group (SAG), The OpenAI leadership, and the OpenAI Board of Directors.
EOF

# Write managing/index.md
cat << 'EOF' > Using/managing/index.md
Managing your GenAI ensures that it is used productively, efficiently, safely, and compliantly. 

You will want to consider means and methods of managing all components and executions in a manner that allows for agility, and flexibility of the components you use.

# Memory

??? abstract "[Vector Admin](https://github.com/mintplex-labs/vector-admin) helps you manage multiple vector database solutions at the same time."

# Agents

??? abstract "[Swarm manager](https://github.com/Mintplex-Labs/openai-assistant-swarm) helps you use all of your OpenAI agents simultaneously."
EOF

# Write managing/ml_ops.md
cat << 'EOF' > Using/managing/ml_ops.md
AI or ML operations, or ML Ops enables streamlined enablement of AI-enabled solutions.

## References
Systems from Google
EOF

# Write managing/observability.md
cat << 'EOF' > Using/managing/observability.md
Understanding and enhancing Generative AI hinges largely on comprehensive monitoring and observability of the AI model's performance and its numerous operational parameters. In this light, observability refers to the capacity to examine and understand the inner workings of generative models, while closely monitoring their output quality.

## Exploring Model and Infrastructure Performance Monitoring
### Observing the Model
Observation forms the bedrock of Generative AI models. Continual tracking and analysis of these models furnishes detailed insights into their operational efficacy and identifies potential areas for improvement, thereby optimizing their function overall.

### Functionality Tracking
With software development, every function plays a crucial role. It's pivotal to observe these functions to identity bugs and areas that warrant enhancement. Consequently, this can boost software efficiency and minimize system lags.

### Monitoring the Infrastructure
Both hardware and software infrastructure holds immense importance to any AI model. Their observability is therefore key to pinpoint and solve potential glitches that could hinder the model's operational efficiency.

## A Closer Look at Input and Output Parameters Monitoring
### Keeping an Eye on Inputs
Keeping a tab on the input parameters of your model can yield rich insights into how it functions. In this process, you can pick up on any anomalies or inconsistencies in the data that could impact the model's operations.

### Observing Outputs
A continuous cycle of tracking and observation of the output, in tandem with the coinciding input, allows us to measure the model's correctness levels. This can help identify recurring errors or boost the model's resilience against variable inputs.

## A Detailed Analysis of Performance Metrics
### Observing Inference Costs
Cost of inference forms a significant part of any computation process. A thorough evaluation at regular intervals can guide adaptations in the model to cut down on its resource consumption. This ensures the model operates economically, thereby elevating its efficiency.

### Monitoring Inference Speed
Monitoring the speed at which a model infers results can aid in optimizing its efficiency, thereby cutting down on delays and speeding up operations. It is through a careful track of these speeds that you can identify system bottlenecks and areas of productivity enhancement.

## Libraries and Tools

!!! example "![GitHub Repo stars](https://badgen.net/github/stars/e2b-dev/e2b) [E2B's](https://github.com/e2b-dev/e2b) integration in AI agent technology stacks opens up new avenues, where it comfortably sits at the bottom, and is agnostic to the

 framework it operates in."

!!! example "![GitHub Repo stars](https://badgen.net/github/stars/llmonitor/llmonitor) [llmonitor](https://github.com/llmonitor/llmonitor) provides self-hosted model monitoring for costs/users/requrets, feedback, etc..."
EOF

# Write managing/regulations_and_guidelines.md
cat << 'EOF' > Using/managing/regulations_and_guidelines.md
## Regulations
!!! important "[Executive order on AI development](https://www.whitehouse.gov/briefing-room/presidential-actions/2023/10/30/executive-order-on-the-safe-secure-and-trustworthy-development-and-use-of-artificial-intelligence/)"

## Compliance evaluations
!!! important "[Foundation model Providers EU AI compliance](https://crfm.stanford.edu/2023/06/15/eu-ai-act.html) - An in-depth analysis on how Machine Learning companies can achieve compliance with the EU's proposed AI regulations."

!!! important "[State of California Benefits and Risks of Generative Artificial Intelligence Report](https://www.govops.ca.gov/wp-content/uploads/sites/11/2023/11/GenAI-EO-1-Report_FINAL.pdf)"

!!! important "[AI Risk-Management Standards Profile for General-Purpose AI Systems (GPAIS) and Foundation Models](https://cltc.berkeley.edu/wp-content/uploads/2023/11/Berkeley-GPAIS-Foundation-Model-Risk-Management-Standards-Profile-v1.0.pdf)"

!!! important [https://www.ncsc.gov.uk/files/Guidelines-for-secure-AI-system-development.pdf]
EOF

# Write strategically/building_or_buying.md
cat << 'EOF' > Using/strategically/building_or_buying.md
Creating an effective strategy for implementing technology solutions often comes down to the critical decision between building a custom solution in-house (build) or purchasing off-the-shelf software (buy). This markdown article aims to provide a comprehensive breakdown of the key factors to consider when faced with the "build vs. buy" dilemma, leveraging mermaid diagrams to illustrate these concepts visually.

# Build vs. Buy: Navigating the Decision Landscape

When your organization is considering new technology, the decision to build a custom solution or buy a pre-existing platform is pivotal. This choice affects not just the immediate project timeline and budget, but also long-term agility, operational efficiency, and the ability to meet specific business needs.

## Key Considerations

### 1. Cost

Cost considerations encompass not just the initial outlay but also long-term expenses associated with maintenance, updates, and scalability.

```mermaid
graph LR
    Cost[Cost] --> InitialCost[Initial Cost]
    Cost --> OngoingCost[Ongoing Cost]
    InitialCost --> BuildCost["Build: Development & Deployment"]
    InitialCost --> BuyCost["Buy: Licensing & Setup"]
    OngoingCost --> Maintenance["Maintenance & Upgrades"]
    OngoingCost --> Scalability["Scalability & Customization"]
```

### 2. Time to Market

The urgency of deployment can significantly influence the build vs. buy decision. Building typically takes longer than buying off-the-shelf solutions that can be deployed rapidly.

```mermaid
graph LR
    TimeToMarket[Time to Market] --> BuildTime["Build: Development Time"]
    TimeToMarket --> BuyTime["Buy: Deployment Time"]
```

### 3. Customization and Flexibility

Customization is crucial for matching specific business processes and needs. Building provides the highest level of customization, while buying may limit the flexibility but offers faster deployment.

```mermaid
graph LR
    Customization[Customization] --> BuildCustom["Build: High Flexibility"]
    Customization --> BuyCustom["Buy: Limited by Product Capabilities"]
```

### 4. Scalability

Consider the solution's ability to grow with your business. Custom-built solutions can be designed for scalability, but at a cost. Off-the-shelf software may offer scalability but with less control over performance parameters.

```mermaid
graph LR
    Scalability[Scalability] --> BuildScale["Build: Custom Scalability"]
    Scalability --> BuyScale["Buy: Pre-defined Scalability"]
```

### 5. Support and Maintenance

Ongoing support and maintenance are critical for the long-term success of any technology solution. Evaluate the costs and availability of support for both options.

```mermaid
graph LR
    Support[Support & Maintenance] --> BuildSupport["Build: In-house or Third-party"]
    Support --> BuySupport["Buy: Vendor Support"]
```

### 6. Security

Security needs vary greatly among organizations. Building allows for tailored security measures, while buying often means relying on the vendor's security protocols.

```mermaid
graph LR
    Security[Security] --> BuildSec["Build: Custom Security"]
    Security --> BuySec["Buy: Vendor's Security Standards"]
```

### 7. Integration with Existing Systems

Integration capabilities can be a deciding factor, especially for organizations with a complex tech stack.

```mermaid
graph LR
    Integration[Integration] --> BuildInt["Build: Fully Customizable"]
    Integration --> BuyInt["Buy: Dependent on Vendor Solutions"]
```

## Making the Decision

The choice between building and buying should be informed by a strategic evaluation of your organization's priorities, resources, and long-term goals. Consider conducting a thorough cost-benefit analysis, taking into account not only the financial outlay but also factors like time to market, customization needs, scalability, support and maintenance requirements, security concerns, and integration capabilities.

### Decision Framework

```mermaid
graph TD
    Decision{"Build vs. Buy Decision"} --> Assess[Assess Needs]
    Assess --> Define[Define Objectives]
    Define --> Analyze[Analyze Options]
    Analyze --> Evaluate[Evaluate Pros & Cons]
    Evaluate --> Decide{Make Decision}
    Decide --> Build[Build Custom Solution] & Buy[Buy Off-the-shelf Solution]
```

Whether to build or buy is a multifaceted decision that requires careful consideration of various factors. By thoroughly evaluating each aspect in relation to your organization's unique needs and strategic direction, you can make an informed choice that aligns with your business objectives, budget, and timeline.
EOF

# Write strategically/business_models.md

cat << 'EOF' > Using/strategically/business_models.md
## Business Models

Revenue Models 

### Monthly user

Pros:
Cons: Super-users may 

### Link-referencing

The responses form LLM models can embed links, allowing an advertiser-based revenue model. 

Pros: 
Cons: 

??? abstract "[Manipulating Large Language Models to Increase Product Visibility](https://github.com/aounon/llm-rank-optimizer)"
    Our work opens up a new field at the intersection of large language models (LLMs) and e-commerce, which we refer to as LLM-based Search Optimization (LSO).  
    [paper](https://arxiv.org/abs/2404.07981)
EOF

# Write strategically/implementation.md
cat << 'EOF' > Using/strategically/implementation.md

EOF

# Write strategically/open_source.md
cat << 'EOF' > Using/strategically/open_source.md
## Open source Chatbots 

(Free or freemium)

[LMSYS](https://chat.lmsys.org/)
EOF

# Write useful_tools/integrations.md
cat << 'EOF' > Using/useful_tools/integrations.md
Gen()AI has increasing value when it can be integrated with software UI that people are already familiar with. With greater familiarity, these tools can be quickly used without incurring switching costs associated with using new UIs. While it is likely most interfaces will be connected to GenAI, via different levels of OS-enablement, here we share some that are particularly useful.

## Closed Source
The integrations with closed source systems are myriad. Because interfacing is key, those interfaces that already exist can be augmented with AI to improve the manner tha people work with them. 

!!! note "[Google Suite](https://www.google.com) provides connection to `Gemini` and similar models across a great variety of apps."

!!! note "[MS office](https://www.microsoft.com/en-us/microsoft-365/products-apps-services) provides connection to Chat-GPT models."
!!! note "[Notion](https://www.notion.so)"

!!! note "[Mem](https://www.mem.ai)"

!!! important "If you have one, please ask to add it in an [issue](https://github.com/ianderrington/genai/issues) or [contribute](../../Managenai/contributing.md) to the change!"

## Open Source

!!! note "For OSX, notes using ollama [notesollama](https://smallest.app/notesollama/)"

!!! note "[Obsidian](ttps://obsidian.md) for markdown allows for numerous [apps](https://obsidian-plugin-stats.vercel.app/) that may contain AI while maintaining a quality interconnected markdown-interface.
EOF

# Write useful_tools/web_plugins.md
cat << 'EOF' > Using/useful_tools/web_plugins.md
## Plugins
Plugins are can enable connection of GenAI with input media, often via web interfaces

- [Mini Wob++](http://miniwob.farama.org/) For web interactive environments for accomplishing different tasks. Quite useful.

- ️[Prompt Genius](https://chrome.google.com/webstore/detail/chatgpt-prompt-genius/jjdnakkfjnnbbckhifcfchagnpofjffo)

- [FastChat Conversation]( https://github.com/lm-sys/FastChat/blob/main/fastchat/conversation.py) This very nice 'multi model' chat interface class allows for effective translation between different models.

## Back-End

- [MaxAI.me](https://app.maxai.me/my-plan) A nice chrome pluging + eventual system that makes your openAI connect to data more directly.
EOF



echo "Markdown files created successfully!"