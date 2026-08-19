---
date: '2026-08-06'
dateModified: '2026-08-06'
categories:
  - Research
  - Agents
  - Reasoning
authors: parnian
---

# ReAct Agents: Synergizing Reasoning and Acting

ReAct (Reasoning + Acting) is a paradigm that combines chain-of-thought reasoning with action-taking, enabling language models to solve complex tasks by interleaving thought and interaction with external tools.

## The Core Insight

Traditional approaches separate reasoning from acting:

| Approach | Limitation |
|----------|------------|
| Chain-of-Thought only | Can't interact with world, facts may be stale |
| Action only | No explicit reasoning, hard to debug |
| ReAct | Best of both—reason about actions, act to gather information |

## The ReAct Loop

```
Question: What is the elevation of the highest mountain in the country 
          where the 2024 Olympics were held?

Thought 1: I need to find where the 2024 Olympics were held.
Action 1: Search[2024 Olympics location]
Observation 1: The 2024 Summer Olympics were held in Paris, France.

Thought 2: The country is France. Now I need to find the highest mountain in France.
Action 2: Search[highest mountain France]
Observation 2: Mont Blanc is the highest mountain in France at 4,808 meters.

Thought 3: I have the answer. Mont Blanc's elevation is 4,808 meters.
Action 3: Finish[4,808 meters]
```

## Implementation

### Basic ReAct Agent

```python
class ReActAgent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = {tool.name: tool for tool in tools}
        self.max_steps = 10
    
    def run(self, question: str) -> str:
        prompt = self.build_initial_prompt(question)
        
        for step in range(self.max_steps):
            # Generate thought and action
            response = self.llm.generate(prompt)
            
            # Parse the response
            thought, action, action_input = self.parse_response(response)
            
            if action == "Finish":
                return action_input
            
            # Execute action
            observation = self.tools[action].run(action_input)
            
            # Update prompt with observation
            prompt += f"\nThought {step+1}: {thought}"
            prompt += f"\nAction {step+1}: {action}[{action_input}]"
            prompt += f"\nObservation {step+1}: {observation}"
        
        return "Max steps reached without answer"
    
    def parse_response(self, response: str):
        # Extract Thought, Action, and Action Input
        thought_match = re.search(r"Thought:(.+?)Action:", response, re.DOTALL)
        action_match = re.search(r"Action:(.+?)\[(.+?)\]", response)
        
        thought = thought_match.group(1).strip() if thought_match else ""
        action = action_match.group(1).strip() if action_match else ""
        action_input = action_match.group(2).strip() if action_match else ""
        
        return thought, action, action_input
```

### Prompt Template

```python
REACT_PROMPT = """Answer the following question by reasoning step-by-step 
and using tools when needed.

Available tools:
- Search[query]: Search the web for information
- Lookup[term]: Look up a term in the current context
- Calculate[expression]: Perform mathematical calculations
- Finish[answer]: Return the final answer

Question: {question}

Think step by step. For each step:
1. Write "Thought:" followed by your reasoning
2. Write "Action:" followed by the tool and input
3. Wait for "Observation:" with the result
4. Repeat until you can provide a final answer

Begin!
"""
```

## ReAct vs Other Approaches

### Chain-of-Thought (CoT)

```
CoT: Think → Think → Think → Answer
     (no external information)

ReAct: Think → Act → Observe → Think → Act → Observe → Answer
       (grounded in real data)
```

### Action-Only

```
Action-Only: Act → Act → Act → Answer
             (no explicit reasoning, brittle)

ReAct: Think → Act → Think → Act → Answer
       (reasoning explains and guides actions)
```

## Advanced Patterns

### ReAct with Self-Reflection

```python
class ReflectiveReActAgent(ReActAgent):
    def reflect(self, trajectory: List[Step]) -> str:
        reflection_prompt = f"""
        Review this problem-solving trajectory:
        {format_trajectory(trajectory)}
        
        What went well? What could be improved?
        Should we try a different approach?
        """
        return self.llm.generate(reflection_prompt)
    
    def run_with_reflection(self, question: str) -> str:
        trajectory = []
        
        for attempt in range(3):
            result, steps = self.run_and_record(question)
            trajectory.extend(steps)
            
            if self.is_confident(result):
                return result
            
            reflection = self.reflect(trajectory)
            # Use reflection to adjust strategy
```

### Hierarchical ReAct

```
High-Level Agent
├── Thought: Break down into subtasks
├── Action: Delegate to SubAgent1
│   └── SubAgent1 runs full ReAct loop
├── Observation: SubAgent1 result
├── Action: Delegate to SubAgent2
│   └── SubAgent2 runs full ReAct loop
├── Observation: SubAgent2 result
└── Finish: Combine results
```

### ReAct with Memory

```python
class MemoryReActAgent(ReActAgent):
    def __init__(self, llm, tools, memory_store):
        super().__init__(llm, tools)
        self.memory = memory_store
    
    def run(self, question: str) -> str:
        # Retrieve relevant past experiences
        relevant_memories = self.memory.search(question, k=3)
        
        # Include in prompt
        prompt = self.build_prompt_with_memories(question, relevant_memories)
        
        result = super().run(question)
        
        # Store this trajectory for future reference
        self.memory.store(question, self.trajectory, result)
        
        return result
```

## Tool Design for ReAct

### Good Tool Design

```python
class SearchTool:
    name = "Search"
    description = "Search the web. Input: search query string"
    
    def run(self, query: str) -> str:
        results = web_search(query)
        # Return concise, actionable information
        return self.format_results(results, max_length=500)
```

### Tool Selection

```python
TOOL_SELECTION_PROMPT = """
Given the current thought, select the most appropriate tool:

Thought: {thought}

Available tools:
1. Search - for finding factual information
2. Calculate - for mathematical operations
3. Code - for running Python code
4. Lookup - for searching in current context

Which tool should be used? Explain briefly, then select.
"""
```

## Evaluation

### Metrics

| Metric | Description |
|--------|-------------|
| Task Success Rate | % of tasks completed correctly |
| Efficiency | Average number of steps to complete |
| Reasoning Quality | Are thoughts logical and helpful? |
| Tool Use Accuracy | Are tools used appropriately? |
| Hallucination Rate | % of false claims in reasoning |

### Benchmarks

- **HotpotQA**: Multi-hop question answering
- **FEVER**: Fact verification
- **ALFWorld**: Embodied tasks in text environments
- **WebShop**: Web navigation and shopping

## Limitations

1. **Error propagation**: Wrong early steps compound
2. **Verbosity**: Lots of tokens for reasoning
3. **Tool dependency**: Limited by available tools
4. **Prompt sensitivity**: Performance varies with prompt design

## Integration with Modern Frameworks

### LangChain

```python
from langchain.agents import create_react_agent
from langchain.tools import Tool

tools = [
    Tool(name="Search", func=search_func, description="..."),
    Tool(name="Calculator", func=calc_func, description="...")
]

agent = create_react_agent(llm, tools, prompt)
result = agent.invoke({"input": question})
```

### LlamaIndex

```python
from llama_index.agent import ReActAgent
from llama_index.tools import QueryEngineTool

agent = ReActAgent.from_tools(
    tools=[query_engine_tool],
    llm=llm,
    verbose=True
)
```

## References

- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
- [Chain-of-Thought Prompting](https://arxiv.org/abs/2201.11903)
- [Toolformer](https://arxiv.org/abs/2302.04761)

---

*ReAct shows that the combination of reasoning and acting is more powerful than either alone—a principle that extends far beyond AI to how humans solve problems.*
