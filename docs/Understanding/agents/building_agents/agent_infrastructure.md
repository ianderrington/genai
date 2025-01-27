!!! note "[Agent INfrastructure](https://arxiv.org/pdf/2501.10114)"

    <img width="659" alt="image" src="https://github.com/user-attachments/assets/bb98195b-edc9-41d8-9e93-061d2348ecdb" />
    
    Infrastructure elements:
    Attribution:
    * Idenity binding
    * Certification
    * Agent IDs
    
    Interaction:
    * AGent Channels
    * Oversight Layers
    * INter-agent communications
    * Commitment devices
    
    Response:
    * INcident reporting
    * Rollbacks
    
    <img width="692" alt="image" src="https://github.com/user-attachments/assets/e2c54f93-a32e-4821-bb1c-e81462237e98" />
    
    
    <img width="700" alt="image" src="https://github.com/user-attachments/assets/04d55506-051e-4d12-97a2-5cf55da7ed9b" />


## Agent APIs languages 



??? abstract "[Agent Protocol by Langchain](https://github.com/langchain-ai/agent-protocol?tab=readme-ov-file)" langchain-agent-protocol

    A framework agnostic API that is used organize Agent applications. It uses the following 3 concepts
    
    **Runs:** APIs for executing an agent
    **Threads:** APIs to organize multi-turn executions of agents
    **Store:** APIs to work with long-term memory

    It focuses an API to allow or 'Atomic agent executions' including CRUD, ambient fire-and-forget, and wait-streaming.  The base endpoints, copied from the docs is as follows:

    ```bash
    Base Endpoints:

    GET /threads/{thread_id}/runs - List runs.
    POST /threads/{thread_id}/runs - Create a run.
    GET /threads/{thread_id}/runs/{run_id} - Get a run and its status.
    POST /threads/{thread_id}/runs/{run_id}/cancel - Cancel a run. If the run hasn’t started, cancel it immediately, if it’s currently running then cancel it as soon as possible.
    DELETE /threads/{thread_id}/runs/{run_id} - Delete a finished run. A pending run needs to be cancelled first, see previous endpoint.
    GET /threads/{thread_id}/runs/{run_id}/wait - Wait for a run to finish, return the final output. If the run already finished, returns its final output immediately.
    GET /threads/{thread_id}/runs/{run_id}/stream - Join the output stream of an existing run. Only output produced after this endpoint is called will be streamed.
    Convenience Endpoints:
    
    POST /threads/{thread_id}/runs/wait - Create a run, and wait for its final output.
    POST /threads/{thread_id}/runs/stream - Create a run, and stream output as produced.
    ```

    [API](https://langchain-ai.github.io/agent-protocol/api.html#tag/threads)

??? abstract "[Agent Protocol](https://github.com/Div99/agent-protocol)" agent-protocol
    Agent Protocol represents a common API specification endpoints that are essential framework agnostic communication between Agents. 

    With python an dtypescript SDKs, it allows for the management of 

    The base objects of the protocol are Tasks, Steps and Artifacts

    Their [Documentation](https://agentprotocol.ai/) provides additional useful understanding 
