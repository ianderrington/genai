Environments consist of the information that agents have access too as well as 'what can be done' to influence the environment. An environment sends information that an agent can receive.

Especially for systems without people-in-the-loop, there is potential for negative things to be done. This could be incorrectly writing files, sending emails/tweets that are inappropriate or spammy, and otherwise corrupt the positive value that an AI-agent may provide. Consequently it is important to have a [sandbox](#sandbox)

### Sandbox

Sandboxes appropriately limit the ability of an Agent to export (write or send) or receieve (read from disk or memory) information beyond the Sandbox. While sandboxes may be fully isolated, sandbox-controllers can provide interaction boundaries that permit some essential degree of information input/output. These boundaries may the ability to only a single file or folder, or a set of domains that are on admit-lists, and refined with block-lists.  

#### Cloud Based Sandboxes

???+ code "[E2B.dev sandbox](https://github.com/e2b-dev/e2b)" e2b.dev-sandbox

    E2B.dev provides a cloud-based sandbox to enable AI-agents to within safe confines. 
    Their [Docs](https://e2b.dev/docs?ref=landing-page-get-started)

#### Local Sandboxes

## Example Environments 
### Chat environment 
In a chat environment the GenAI receives text information from a user and then returns text information that is printed for the user to read.
!!! example "[chat Langchain ](https://github.com/langchain-ai/chat-langchain/tree/master)"

### Web environments

??? code "[Webarena:](https://github.com/web-arena-x/webarena)" webarena

    **Developments** "WebArena is a standalone, self-hostable web environment for building autonomous agents. WebArena creates websites from four popular categories with functionality and data mimicking their real-world equivalents. To emulate human problem-solving, WebArena also embeds tools and knowledge resources as independent websites. WebArena introduces a benchmark on interpreting high-level realistic natural language command to concrete web-based interactions. We provide annotated programs designed to programmatically validate the functional correctness of each task."

    ![image](https://github.com/ianderrington/genai/assets/76016868/a7e3ee14-dae3-4052-b4c2-d51ff43d0040)

    [Paper](https://arxiv.org/pdf/2307.13854.pdf)    
    [Webpage](https://webarena.dev/)

### Social Simulations
!!! example "A town simulation"
    In [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/pdf/2304.03442.pdf) A town is simulated to provide observable information and an interaction world with/between other agents.

### Embodied environments

Embodied environments involve acuiring information from reality using recording instrumentation like cameras, microphones. 

#### Self-aware embodiments

Self aware embodiments involve knowing a measured of an actuating device, such as the angle or extension of a robotic limb. 

### Gaming
!!! code "[Madrona Game Enging](https://madrona-engine.github.io/)"

??? code "[Voyager, an Agent in Minecraft](https://github.com/MineDojo/Voyager)"
    [Website](https://voyager.minedojo.org/)
    [Paper](https://arxiv.org/pdf/2305.16291.pdf)


