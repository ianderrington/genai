---
date:
  created: 2025-03-07
  updated: 2025-03-07
categories:
  - Research
  - Agents
  - Systems
authors:
  - parnian
---

# Multi-Agent Orchestration: Coordinating AI Collectives

Multi-agent systems enable complex tasks by dividing work across specialized AI agents that collaborate, debate, and verify each other's work—mimicking how human organizations operate.

## Why Multiple Agents?

Single agents hit fundamental limitations:

```
Single Agent Limits:
├── Context window (can't hold all relevant info)
├── Expertise (can't be best at everything)
├── Verification (can't reliably check own work)
└── Parallelism (sequential processing bottleneck)

Multi-Agent Solution:
├── Distributed context (each agent holds relevant subset)
├── Specialization (agents optimized for specific tasks)
├── Cross-checking (agents verify each other)
└── Parallel execution (independent subtasks run concurrently)
```

## Orchestration Patterns

### 1. Hierarchical (Manager-Worker)

```python
class HierarchicalOrchestrator:
    def __init__(self, manager, workers):
        self.manager = manager
        self.workers = {w.specialty: w for w in workers}

    async def solve(self, task):
        # Manager breaks down task
        plan = self.manager.decompose(task)

        results = {}
        for subtask in plan.subtasks:
            # Route to appropriate worker
            worker = self.workers[subtask.type]
            results[subtask.id] = await worker.execute(subtask)

        # Manager synthesizes results
        return self.manager.synthesize(task, results)
```

### 2. Pipeline (Sequential Handoff)

```python
class PipelineOrchestrator:
    def __init__(self, stages):
        self.stages = stages  # Ordered list of agents

    async def process(self, input_data):
        current = input_data

        for agent in self.stages:
            current = await agent.process(current)
            # Each stage transforms and passes forward

        return current

# Example: Code Review Pipeline
pipeline = PipelineOrchestrator([
    StaticAnalysisAgent(),      # Find obvious issues
    SecurityReviewAgent(),       # Check vulnerabilities
    PerformanceReviewAgent(),    # Identify bottlenecks
    StyleReviewAgent(),          # Enforce conventions
    SummaryAgent()               # Consolidate feedback
])
```

### 3. Debate (Adversarial Collaboration)

```python
class DebateOrchestrator:
    def __init__(self, proposer, critic, judge, max_rounds=5):
        self.proposer = proposer
        self.critic = critic
        self.judge = judge
        self.max_rounds = max_rounds

    async def solve(self, problem):
        proposal = await self.proposer.propose(problem)

        for round in range(self.max_rounds):
            # Critic finds weaknesses
            critique = await self.critic.critique(proposal)

            if not critique.has_issues:
                break

            # Proposer defends or revises
            proposal = await self.proposer.revise(proposal, critique)

        # Judge makes final decision
        return await self.judge.decide(problem, proposal)
```

### 4. Voting (Ensemble Consensus)

```python
class VotingOrchestrator:
    def __init__(self, agents, aggregation="majority"):
        self.agents = agents
        self.aggregation = aggregation

    async def decide(self, question):
        # All agents answer independently
        votes = await asyncio.gather(*[
            agent.answer(question) for agent in self.agents
        ])

        if self.aggregation == "majority":
            return Counter(votes).most_common(1)[0][0]
        elif self.aggregation == "weighted":
            return self.weighted_vote(votes)
        elif self.aggregation == "unanimous":
            return votes[0] if len(set(votes)) == 1 else None
```

### 5. Blackboard (Shared State)

```python
class BlackboardOrchestrator:
    def __init__(self, agents):
        self.agents = agents
        self.blackboard = SharedState()

    async def solve(self, problem):
        self.blackboard.write("problem", problem)

        while not self.blackboard.has("solution"):
            # Each agent can read/write blackboard
            contributions = await asyncio.gather(*[
                agent.contribute(self.blackboard)
                for agent in self.agents
                if agent.can_contribute(self.blackboard)
            ])

            for contribution in contributions:
                self.blackboard.apply(contribution)

        return self.blackboard.read("solution")
```

## Communication Protocols

### Message Passing

```python
@dataclass
class AgentMessage:
    sender: str
    recipient: str  # or "broadcast"
    type: Literal["request", "response", "notify", "query"]
    content: dict
    correlation_id: str  # For request-response matching
    timestamp: datetime

class MessageBus:
    def __init__(self):
        self.subscribers = defaultdict(list)
        self.pending = {}

    async def send(self, message: AgentMessage):
        if message.recipient == "broadcast":
            for agent in self.subscribers["*"]:
                await agent.receive(message)
        else:
            for agent in self.subscribers[message.recipient]:
                await agent.receive(message)

    async def request(self, message: AgentMessage, timeout=30):
        """Send and wait for response."""
        future = asyncio.Future()
        self.pending[message.correlation_id] = future
        await self.send(message)
        return await asyncio.wait_for(future, timeout)
```

### Structured Handoffs

```python
@dataclass
class TaskHandoff:
    task: Task
    context: dict  # What recipient needs to know
    constraints: List[str]  # Requirements for subtask
    expected_output: OutputSchema
    deadline: Optional[datetime]

class HandoffProtocol:
    def create_handoff(self, task, recipient_type):
        return TaskHandoff(
            task=task,
            context=self.extract_relevant_context(task, recipient_type),
            constraints=self.get_constraints(recipient_type),
            expected_output=self.get_output_schema(task),
            deadline=task.deadline
        )
```

## State Management

```python
class DistributedState:
    """Shared state across agents with consistency guarantees."""

    def __init__(self, consistency="eventual"):
        self.state = {}
        self.version = 0
        self.locks = {}
        self.consistency = consistency

    async def read(self, key):
        return self.state.get(key)

    async def write(self, key, value, expected_version=None):
        if expected_version and self.version != expected_version:
            raise ConflictError("State changed since read")

        async with self.locks.setdefault(key, asyncio.Lock()):
            self.state[key] = value
            self.version += 1

    async def atomic_update(self, key, updater):
        """Read-modify-write atomically."""
        async with self.locks.setdefault(key, asyncio.Lock()):
            current = self.state.get(key)
            new_value = updater(current)
            self.state[key] = new_value
            self.version += 1
            return new_value
```

## Error Handling & Recovery

```python
class ResilientOrchestrator:
    def __init__(self, primary, fallbacks, max_retries=3):
        self.primary = primary
        self.fallbacks = fallbacks
        self.max_retries = max_retries

    async def execute(self, task):
        agents = [self.primary] + self.fallbacks

        for agent in agents:
            for attempt in range(self.max_retries):
                try:
                    result = await agent.execute(task)
                    if self.validate(result):
                        return result
                except AgentError as e:
                    if not e.retryable:
                        break
                    await asyncio.sleep(2 ** attempt)

        # All agents failed
        return await self.human_escalation(task)

    async def checkpoint(self, state):
        """Save progress for recovery."""
        await self.state_store.save(state)

    async def recover(self, task_id):
        """Resume from last checkpoint."""
        state = await self.state_store.load(task_id)
        return await self.execute_from(state)
```

## Practical Example: Research Agent System

```python
class ResearchOrchestrator:
    def __init__(self):
        self.planner = PlannerAgent()
        self.searcher = SearchAgent()
        self.reader = ReaderAgent()
        self.synthesizer = SynthesizerAgent()
        self.critic = CriticAgent()

    async def research(self, question, depth="thorough"):
        # Plan research approach
        plan = await self.planner.plan(question)

        # Execute searches in parallel
        search_results = await asyncio.gather(*[
            self.searcher.search(query)
            for query in plan.queries
        ])

        # Read and extract from sources
        extractions = await asyncio.gather(*[
            self.reader.extract(source, plan.focus_areas)
            for source in flatten(search_results)
        ])

        # Synthesize findings
        draft = await self.synthesizer.synthesize(
            question, extractions
        )

        # Critical review
        critique = await self.critic.review(draft)

        if critique.needs_revision:
            # Iterative refinement
            return await self.revise(draft, critique)

        return draft
```

## Monitoring & Observability

```python
class OrchestrationMonitor:
    def __init__(self):
        self.metrics = MetricsCollector()
        self.traces = []

    def trace(self, agent, action, duration, result):
        self.traces.append({
            "agent": agent.id,
            "action": action,
            "duration": duration,
            "success": result.success,
            "timestamp": datetime.now()
        })

    def get_bottlenecks(self):
        """Find slowest agents/steps."""
        by_agent = defaultdict(list)
        for t in self.traces:
            by_agent[t["agent"]].append(t["duration"])

        return sorted(
            [(a, np.mean(d)) for a, d in by_agent.items()],
            key=lambda x: -x[1]
        )
```

## Scaling Considerations

| Agents | Communication | State Management | Best For |
|--------|---------------|------------------|----------|
| 2-5 | Direct messaging | Shared memory | Simple pipelines |
| 5-20 | Message queue | Distributed cache | Complex workflows |
| 20-100 | Pub/sub | Database | Large organizations |
| 100+ | Event streaming | Sharded storage | Enterprise scale |

## References

- [Generative Agents: Interactive Simulacra](https://arxiv.org/abs/2304.03442)
- [AutoGen: Multi-Agent Conversations](https://arxiv.org/abs/2308.08155)
- [CAMEL: Communicative Agents](https://arxiv.org/abs/2303.17760)
- [ChatDev: Software Development Agents](https://arxiv.org/abs/2307.07924)

---

*Multi-agent systems reveal that the path to AGI might not be a single superintelligent model, but a well-orchestrated collective of specialized intelligences.*
