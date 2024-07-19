# AI Governance

!!! quote "[From PECB](https://pecb.com/article/navigating-iso-standards-and-ai-governance-for-a-secure-future)"
    AI governance ensures ethical, safe, and responsible development and deployment of artificial intelligence technologies. It encompasses a set of rules, standards, and processes that guide AI research and applications, aiming to protect human rights and promote fairness, accountability, and transparency. 

Governance helps to ensure AI systems are ethical, consistent with individual, company and societal principles, value-producing with successful results that benefit customers and businesses, and compliant: adherent to local, regional, national, and international laws. 

Effective governance at appropriate institutional levels will _improve_ results, whiel minimizing risks to customers and businesses. The challenge is in understanding what is right for your business. 

## Common Elements in AI Governance

### Ethics: Principles to aim towards
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
