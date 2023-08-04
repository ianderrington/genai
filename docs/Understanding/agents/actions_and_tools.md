

## Action
Actions may be be internal or externally focused.  focused generally related to an agent's '`memory`, or externally focused, with tools, though their distinction may be moot. 

**Internal actions** generally relate reading, writing or updating, an agents memory, [memory](./memory.md) state, such as free-text `scratech-pad`, an ordered `memory-log` or a vector database.

**External actions** may be to act on simulated or real environments, or to use a toolthat an agent may be 'equipped with' to run. 

### Executors
The action that an agent may take is enabled by an `AgentExecutor` or interpretor of the LLM output, that coordinates the call to perform the action. 


## Tools

Tools generally consist of single function calls to something that will return value to the end-point destination, be that the agent itself or a person interacting with an agent. 

## Toolkits

Toolkits consist of tool pearings that often work together well. For instance, bash commands for file creation, deletion, naming and movement. Toolkits can be api-calls or 


