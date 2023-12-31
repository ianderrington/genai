
To go beyond, we will be using Generative AI to create and expand. There are several 'stages' that may be considered. 

1. Manual, and automated use of GenAI to [improve and refine](#improve_and_refine_content) content already present. 
1. Automatic triggering of GenAI to [incorporate new](#incorporate) content coming from external inputs. 
1. Searching for external inputs based on appropriate information feeds. 
1. Responsive Chatty AI Oracle that will be 
1. Agentic AI Oracle that will implement the solutions, or outline solutions for you to be implemented to achieve your goals. 

### Improve and refine content


### Incorporate new content

```mermaid 

flowchart TD
    A[Start: Issue Update Triggered] --> B{KG Node Updated?}
    B -- Yes --> C[Parse KG for Vector Embedding Contents]
    B -- No --> I[End: No Update Needed]
    C --> D[Create Vector Embedding of KG Content]
    D --> E[Generate Vector Representation of Existing Documentation]
    E --> F{Find Best Location for New Content}
    F -- New Section Needed --> G[Create New Section in Documentation]
    F -- Existing Section --> H[Update Existing Section in Documentation]
    G --> J[Update KG with Documentation Links]
    H --> J
    J --> K[Refine Adjacent Node Connections in KG]
    K --> L[Synthesize and Integrate Content into Documentation]
    L --> M[Commit Changes to Documentation Repository]
    M --> N[End: Documentation Updated]

```



## Detailed Action Plan for GitHub Actions and Knowledge Graph Integration

### Phase 1: MVP Development
GitHub Actions for Issue Submission and Initial Evaluation

**Develop a GitHub Action** to trigger on issue creation by an approved user.
The Action should check if the submitted document/concept is already in the documentation tree using a simple keyword-based search.
If the concept is not present, the Action should tag the issue for further processing.

**Basic Knowledge Graph (KG) Construction**: 
Start building a basic KG with a simple schema focusing on key concepts and relations in the existing documentation.
Implement fuzzy and exact match search capabilities.
Initially, manually identify appropriate locations for new concepts in the documentation tree.
Summarization and Content Integration

**Develop a basic summarization tool** to create summaries of submitted documents.
Manually integrate these summaries into the appropriate locations in the documentation.
**Caching of External Sources**
Set up a simple caching mechanism for external sources like GitHub repositories, PDFs, and blogs.
Manually link these sources to relevant parts of the knowledge graph.

### Phase 2: Enhanced Functionality and Automation
Advanced KG Development with Automated Placement

**Enhance the KG** with a more comprehensive schema that includes internal concepts and external primary sources.
Automate the identification of appropriate locations for new concepts in the documentation tree based on the KG.
Improved Summarization and Integration

**Upgrade the summarization tool** to more accurately represent complex documents.
Automate the integration of these summaries into the documentation using GitHub Actions.
Full Automation of External Source Caching

**Fully automate the process** of caching and linking external sources to the KG.

### Phase 3: Community Engagement and Expansion
Community Feedback Mechanism

Implement a system for community feedback on the documentation and knowledge graph.
Use this feedback to iteratively improve the system.
Release Plan and External Communication

Prepare a release plan with clear milestones aligned with the above phases.
For each major release:
Write a blog post detailing the new features and improvements.
Engage with tech communities and platforms (like Hacker News, Reddit’s r/MachineLearning) to share updates.
Consider reaching out to tech-focused media outlets like TechCrunch for broader exposure.
Open-Source Community Building

Actively encourage open-source contributions by providing clear contribution guidelines and engaging with contributors through GitHub issues and pull requests.
Continuous Improvement and Scaling

Continuously refine the system based on user feedback and technological advancements.
Plan for scaling both the knowledge graph and the GitHub Actions workflows as the project grows.
Blog Announcement and Communication Strategy
Initial Announcement: Introduce the project's goals, the MVP concept, and a call for early adopters and contributors.
Post-Phase 1 Release: Highlight the initial capabilities, share success stories or use cases, and outline future enhancements.
Subsequent Releases: Update the community on new features, improvements, and invite feedback.
Regular Updates: Maintain a cadence of regular updates, including technical insights, challenges faced, and resolutions.


### Initial Announcement
Functional MVP (Minimum Viable Product):

Core Features: Have the basic but functional features of your project implemented. This includes the initial GitHub Actions setup for issue submission and evaluation, a rudimentary version of the Knowledge Graph (KG), and a basic implementation of document summarization and integration.
Documentation: Detailed documentation of the existing features, setup instructions, and how to contribute. This is crucial as it not only serves as a guide for users and contributors but also demonstrates your ability to manage and present a complex project.
Demonstrated Use Case:

Working Example: Include at least one working example in your repository that clearly demonstrates the project's current capabilities. This could be a case study or a practical demonstration of the system processing and integrating a document.
Visuals and Explanations: Accompany this with visuals (like flowcharts or screenshots) and thorough explanations. This will help in communicating the project's functionality and your technical acumen.
Project Roadmap:

Clear Roadmap: Outline a clear and detailed roadmap for future development. This should include planned features, enhancements, and areas where community contributions are encouraged.
Milestones: Set realistic milestones that show a structured approach to development and indicate opportunities for community involvement.
Community Engagement Plan:

Contribution Guidelines: Establish clear guidelines for contributions, including coding standards, pull request processes, and issue reporting.
Communication Channels: Set up channels for community engagement, such as a project discussion forum, a dedicated Slack or Discord channel, or a mailing list.
Personal Reflection:

Your Role and Contributions: Clearly articulate your role in the project and your contributions. This is important to highlight your individual skills and leadership in the project's development.
Learning and Challenges: Share your learning experience and challenges faced during the initial development phase. This openness adds to your credibility and reflects your problem-solving skills.
Timing for Announcement
Strategic Timing: Consider announcing your project at a time when it is most likely to get noticed. This could be aligned with major tech events, AI conferences, or relevant community events.
Prepare for Feedback: Be ready to receive and respond to feedback upon announcement. Engaging with the initial audience is crucial for building a community and can also lead to valuable insights and improvements.

Using Github to organize our understanding of a fluid field is a notable challenge. Because of the acessibility of mkdocs-material it makes it easy to make nice-looking documentaiton, though sometimes without the niceties that could accompany other software systems. 

Eventually we may shift to other systems (like docusaurus). Before that though, we will be wanting to integrate state-of-the-art updates to understanding while we build our auto-building system. 


## Generative Building

- [x] Enable simple jupyter-notebook calls to improve documents.
    - [ ] Ensure all links are preserved.
    - [ ] Enable multiple LLM integration, for instance with Llama on OSX. 
- [ ] Enable automatic github PRs based on a continuous feedback system (Like Auto-GPT). 
- [ ] Enable vector-databasing and other RAG tools to function, focusing on 
    - [ ] individual github-repositories 
    - [ ] linked documents

## Visualization

We can make this easier to read

- [ ] Improve landing page and header bar to be more modern. 
- [ ] Build interactive graph representation of this site that includes summary information. Check [this out](https://towardsdatascience.com/making-network-graphs-interactive-with-python-and-pyvis-b754c22c270) and the [examples](../Using/examples/index.md)
- [ ] https://melaniewalsh.github.io/Intro-Cultural-Analytics/06-Network-Analysis/02-Making-Network-Viz-with-Bokeh.html
- [ ] build with https://docusaurus.io/
- [ ] Integrate example python notebooks and build with https://github.com/outerbounds/nbdoc

- [mkdocs charts](https://github.com/timvink/mkdocs-charts-plugin)