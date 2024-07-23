
!!! quote "Be sure to consider the unintended consequences."
    - Sundar Pichai, Google's CEO




Core elements in AI governance require ethics to guide AI governance. While there are many variations surrounding thes, from sources such as [this one](https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/resource-for-organisation/ai/sgmodelaigovframework2.pdf), they can include considerations such as the following:

1. Human-centric: Amplifies the capabilities and protects the interests of people. 
2. Transparency: All aspects of the AI system and its development are thoughtfully described and documented.
3. Fairness: Equitable and beneficial for all
4. Explainability: The AI's results can be understood and reproduced
5. Sustainability: Minimizes environmental impact
6. Accountability: Enabling actions to be taken to prevent future failures
7. Observability: Allows one to observe the AI to be evaluated
8. Positive Impact: Creates positive value for all parties
9. Private: Appropriately protects the privacy rights of people
10. Secure: Cannot be mis-used intentionally or unintentionally



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
Use anonymization and de-identification techniques to protect user data while still allowing for meaningful analysis.

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
