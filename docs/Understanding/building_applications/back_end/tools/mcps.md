??? tip "[Model Context Protocol](https://modelcontextprotocol.io/introduction)" mcp
    MCP is an open protocol that standardizes how applications provide context to LLMs, similar to how USB-C connects devices. It enables seamless integration of LLMs with various data sources and tools, offering pre-built integrations, flexibility in switching LLM providers, and best practices for data security.
    
    ```mermaid
    graph TD
        A[Your Computer] -->|MCP Protocol| B[MCP Server A]
        A -->|MCP Protocol| C[MCP Server B]
        A -->|MCP Protocol| D[MCP Server C]
        A -->|"MCP Client (Claude, IDEs, Tools)"| E[Host]
        
        B -->|Local Data Source A| F[Local Data Source A]
        C -->|Local Data Source B| G[Local Data Source B]
        D -->|Web APIs| H[Web APIs]
        
        D -->|Internet| I[Remote Service C]
    ```






## Bundlers
https://glama.ai/mcp/servers
https://www.Smithery.ai
https://github.com/highlight-ing/mcp-bundler


https://github.com/Dhravya/apple-mcp/

## Useful MCPs

AgentDesk MCP Cursor-browser awareness https://browsertools.agentdesk.ai/installation

https://docs.composio.dev/concepts/authentication/overview

https://github.com/langchain-ai/langchain-mcp-adapters

https://github.com/cmann50/mcp-chrome-google-search


https://github.com/lastmile-ai/mcp-agent

Monorepo https://github.com/nrwl/nx

Meta MCP https://github.com/metatool-ai/metatool-app
https://github.com/metatool-ai/mcp-server-metamcp 


### Docker



Docker MCP server… don’t have to run command in terminal. 
https://www.youtube.com/watch?v=A9BiNPf34Z4