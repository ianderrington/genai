Governing is an essential component to effective AI usage, especially within larg organizations or when the use of AI for a product has greater potential to cause harm in its design. Applications of AI need to be evaluated based on their risk to do harm and be used ethically.

# AI Governance

!!! quote "[From PECB](https://pecb.com/article/navigating-iso-standards-and-ai-governance-for-a-secure-future)"
    AI governance ensures ethical, safe, and responsible development and deployment of artificial intelligence technologies. It encompasses a set of rules, standards, and processes that guide AI research and applications, aiming to protect human rights and promote fairness, accountability, and transparency. 

Governance helps to ensure AI systems are ethical, consistent with individual, company and societal principles, value-producing with successful results that benefit customers and businesses, and compliant: adherent to local, regional, national, and international laws. 

Effective governance at appropriate institutional levels will _improve_ results, whiel minimizing risks to customers and businesses. The challenge is in understanding what is right for your business. 




## Why govern?

In order have the greatest potential positive impact in your use of AI, governance is essential. The larger the organization, the greater the importance of governance to help minimize needlessly duplicated internal systems and efforts. Even for smaller organizations, effective governance from the beginning will enable your organization to more reasonably create and deliver effective and responsible AI-enabled solutions.

## How to Govern

1. Establish an appropriate body of leadership and a surrounding community that supports the development of AI that is both responsible and effective.
1. Create or adopt a set of _AI principles_ that align with your company,
1. Creast or adopt a set of procedures for creating, evaluating, and managing your AI systems.
1. Create, license, or otherwise use AI [_ML ops](ml_ops.md) [_observability_](./observability.md) platforms/tools that you will use to implement and maintain AI-enabled projects that is consistent with your procedures and principles.
1. Transparently communicate the development and status of your AI-enabled system with internal and regulatory bodies.


## Preparedness

It is possible, if not likely, that more powerful Generative and General AI will come about. Consequently, it is essential to prepare for it in such a way to scientifically and effectively mitigate any potential risks, including catestrophic risks.  As part of this OpenAI has established a [preparedness framework](https://cdn.openai.com/openai-preparedness-framework-beta.pdf) that they are working with. Other companies may wish to follow suite. This framework, in summary, considers three things. 
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

The categories are partioned into the following:
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



## Common Elements in AI Governance

### Ethics: Principles to aim towards

### Responsible Development and Monitoring

#### Risk identification and Mitigation 
!!! note "Risk severity table from [here](https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/resource-for-organisation/ai/sgmodelaigovframework2.pdf)"
    <img width="329" alt="image" src="https://github.com/user-attachments/assets/ccd3c12d-2652-46f5-8044-61e275c7f290">


#### Lifecycle Maintenance

#### Observability

#### Feedback


## What Governmence looks like
There are a number of resources all around the internet that may faciliate in understanding what should. be done. One example is the [AI-Governance](https://ai-governance.eu/) provides an example 'Hourglass Model' for organizations to organize their AI

!!! important "[The Hourglass Model](https://ai-governance.eu/ai-governance-framework/the-hourglass-model/)"
    ![image](https://github.com/user-attachments/assets/cc587b6b-23b5-4c19-a227-fcaeb9dcebcc)

The different components have associated tasks, which we take from [here](https://arxiv.org/pdf/2206.00335), helps to identify the different tasks that should be done throughout the lifecycl eof AI products.

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
  - CPO - Chief Privacy Officer
  - CDO - Chief Data Officer
6. Legal - Ensuring AI Compliance and security
7. Communication - Presenting internal and external representations of stances towards AI 
8. System or application owner(s) - Those building overal products
9. Software Architects and Developers
10. AI/ML Engineers and Researchers - Creating AI solutions 
11. Data Scientists and Domain Experts - Helping to understand enable Data for use in AI systems
12. UX - User Interfacing and  Experience
13. Users - Those who use the AI
