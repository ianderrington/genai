---
date:
  created: 2025-02-25
  updated: 2025-02-25
categories:
  - Research
  - Robotics
  - Applications
authors:
  - parnian
---

# Embodied AI: Language Models Meet Physical World

Embodied AI connects language models to physical robots, enabling machines to understand natural language commands and execute complex real-world tasks through perception and action.

## The Grand Challenge

```
Language Model (disembodied):
"How do I make coffee?" → Text instructions

Embodied AI:
"Make me coffee" → Robot physically makes coffee

Requirements:
├── Understand language (NLP)
├── Perceive environment (Vision)
├── Plan actions (Planning)
├── Execute motion (Control)
├── Handle failures (Robustness)
└── Learn from experience (Adaptation)
```

## Foundation Models for Robotics

### PaLM-E: Embodied Multimodal LLM

```python
class PaLME:
    """Multimodal LLM with robot state understanding."""

    def __init__(self):
        self.vision_encoder = ViT()
        self.robot_encoder = StateEncoder()
        self.language_model = PaLM()

    def forward(self, text, images, robot_state):
        # Encode visual observations
        visual_tokens = self.vision_encoder(images)

        # Encode robot proprioception
        state_tokens = self.robot_encoder(robot_state)

        # Interleave with text
        sequence = interleave(
            text_tokens,
            visual_tokens,
            state_tokens
        )

        # Generate action or response
        return self.language_model(sequence)

# Example:
# Input: "Pick up the red block" + camera image + joint angles
# Output: "move_arm(x=0.3, y=0.5, z=0.1); close_gripper()"
```

### RT-2: Vision-Language-Action Model

```python
class RT2:
    """End-to-end vision-language to robot actions."""

    def __init__(self):
        self.vlm = VisionLanguageModel()
        self.action_head = ActionHead()

    def forward(self, image, instruction):
        # VLM processes image and instruction
        features = self.vlm(image, instruction)

        # Output is action tokens (discretized actions)
        action_tokens = self.action_head(features)

        # Decode to continuous actions
        return self.decode_actions(action_tokens)

    def decode_actions(self, tokens):
        """Convert discrete tokens to robot commands."""
        # Each dimension discretized into 256 bins
        return {
            "delta_x": self.unbin(tokens[0]),
            "delta_y": self.unbin(tokens[1]),
            "delta_z": self.unbin(tokens[2]),
            "delta_roll": self.unbin(tokens[3]),
            "delta_pitch": self.unbin(tokens[4]),
            "delta_yaw": self.unbin(tokens[5]),
            "gripper": tokens[6]  # binary
        }
```

## Language-Conditioned Policies

### Code as Actions

```python
class CodeAsPolicy:
    """LLM generates code that robot executes."""

    def __init__(self, llm, perception_api, robot_api):
        self.llm = llm
        self.perception = perception_api
        self.robot = robot_api

    def execute(self, instruction):
        prompt = f"""You control a robot with these APIs:

Perception:
- detect_objects() -> list of (name, position)
- get_object_position(name) -> (x, y, z)
- is_holding() -> bool

Actions:
- move_to(x, y, z)
- pick_up(object_name)
- place_at(x, y, z)
- say(message)

Instruction: {instruction}

Generate Python code to accomplish this:
```python
"""

        code = self.llm.generate(prompt)

        # Execute in sandboxed environment
        return self.safe_execute(code)

    def safe_execute(self, code):
        """Run code with safety constraints."""
        namespace = {
            "detect_objects": self.perception.detect_objects,
            "get_object_position": self.perception.get_object_position,
            "move_to": self.robot.move_to,
            "pick_up": self.robot.pick_up,
            "place_at": self.robot.place_at,
        }
        exec(code, namespace)
```

### Hierarchical Planning

```python
class SayCan:
    """LLM plans, value function grounds in reality."""

    def __init__(self, llm, skill_library, value_functions):
        self.llm = llm
        self.skills = skill_library
        self.values = value_functions  # Learned affordances

    def plan(self, instruction, scene):
        # LLM proposes next skill
        candidates = self.llm.rank_skills(instruction, self.skills)

        # Value function scores feasibility
        grounded_scores = []
        for skill, llm_score in candidates:
            # Can we actually do this skill right now?
            affordance = self.values[skill](scene)
            grounded_scores.append((skill, llm_score * affordance))

        # Select highest grounded score
        best_skill = max(grounded_scores, key=lambda x: x[1])[0]

        # Execute and update
        success = self.execute(best_skill)

        if self.is_done(instruction):
            return True
        else:
            return self.plan(instruction, self.observe())
```

## Simulation-to-Real Transfer

```python
class SimToReal:
    """Train in simulation, deploy on real robot."""

    def __init__(self):
        self.sim_env = IsaacSim()
        self.real_robot = RealRobot()

    def domain_randomization(self):
        """Randomize sim to cover real variations."""
        return {
            "friction": uniform(0.5, 1.5),
            "mass": uniform(0.8, 1.2),
            "camera_noise": gaussian(0, 0.05),
            "lighting": uniform(0.5, 2.0),
            "textures": sample_random_textures(),
            "action_delay": uniform(0, 0.05),  # Latency
        }

    def train_in_sim(self, task, n_episodes=100000):
        policy = Policy()
        for episode in range(n_episodes):
            # Randomize domain
            env = self.sim_env.reset(self.domain_randomization())

            # Collect trajectory
            trajectory = self.rollout(policy, env, task)

            # Update policy
            policy.update(trajectory)

        return policy

    def deploy_to_real(self, policy):
        """Transfer learned policy to real robot."""
        # Fine-tune with few real examples
        real_data = self.collect_real_demos(n=10)
        policy.finetune(real_data)

        return policy
```

## Open Vocabulary Manipulation

```python
class OpenVocabManipulation:
    """Handle any object described in language."""

    def __init__(self, vlm, robot):
        self.vlm = vlm  # e.g., CLIP, SigLIP
        self.robot = robot

    def find_object(self, description, image):
        """Locate object from natural language description."""
        # Get object proposals
        masks, boxes = self.segment_anything(image)

        # Score each region against description
        scores = []
        for mask, box in zip(masks, boxes):
            crop = image[box]
            similarity = self.vlm.similarity(crop, description)
            scores.append(similarity)

        # Return best match
        best_idx = np.argmax(scores)
        return masks[best_idx], boxes[best_idx]

    def manipulate(self, description, action):
        """Execute action on described object."""
        image = self.robot.get_image()
        mask, box = self.find_object(description, image)

        # Get 3D position from depth
        depth = self.robot.get_depth()
        position = self.depth_to_3d(box, depth)

        # Execute action
        if action == "pick":
            self.robot.pick_up(position)
        elif action == "push":
            self.robot.push(position)
        # ...
```

## Multi-Robot Coordination

```python
class MultiRobotLLMPlanner:
    """LLM coordinates multiple robots."""

    def __init__(self, llm, robots):
        self.llm = llm
        self.robots = robots

    def coordinate(self, task):
        prompt = f"""You coordinate {len(self.robots)} robots.

Robot capabilities:
{self.describe_robots()}

Task: {task}

Generate a plan that:
1. Assigns subtasks to robots
2. Specifies dependencies
3. Handles coordination

Plan:"""

        plan = self.llm.generate(prompt)
        return self.parse_and_execute(plan)

    def parse_and_execute(self, plan):
        tasks = self.parse_tasks(plan)
        dependencies = self.parse_dependencies(plan)

        # Execute with coordination
        scheduler = TaskScheduler(self.robots, tasks, dependencies)
        return scheduler.run()
```

## Benchmarks and Evaluation

| Benchmark | Domain | Tasks | Metric |
|-----------|--------|-------|--------|
| ALFRED | Home | 7 task types | Success rate |
| RLBench | Tabletop | 100 tasks | Success rate |
| BEHAVIOR | Home | 100 activities | Task completion |
| Language-Table | Tabletop | Open vocab | Success rate |
| Open X-Embodiment | Multi-robot | 527 skills | Success rate |

## Challenges

```
1. Grounding gap
   LLM: "Pick up the cup"
   Reality: Which cup? Where exactly? How much force?

2. Long-horizon planning
   Task: "Clean the kitchen"
   Requires: 100+ primitive actions, error recovery

3. Safety
   LLM: "Move fast to the target"
   Reality: Could injure humans nearby

4. Generalization
   Trained: Lab kitchen with specific objects
   Deployed: User's kitchen with novel objects

5. Real-time constraints
   LLM latency: 500ms
   Robot control: 1000Hz needed
```

## References

- [PaLM-E: An Embodied Multimodal Language Model](https://arxiv.org/abs/2303.03378)
- [RT-2: Vision-Language-Action Models](https://arxiv.org/abs/2307.15818)
- [Do As I Can, Not As I Say (SayCan)](https://arxiv.org/abs/2204.01691)
- [Code as Policies](https://arxiv.org/abs/2209.07753)
- [Open X-Embodiment](https://arxiv.org/abs/2310.08864)

---

*Embodied AI is where language meets physics—transforming AI from systems that talk about the world to systems that act within it.*
