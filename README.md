# Build AI-Agents

### What is AI ?

AI (Artificial Intelligence) is a branch of computer science focused on building machines or software that can perform tasks that typically require human intelligence.

Key Abilities of AI: **Learning from data , Reasoning or making decisions, Perceiving environment and Acting autonomously**

### Types of AI (by capability)

- **Narrow AI** : Performs one specific task eg. Siri, Google Translate
- **General AI** : Can learn and do anything a human can (Still theoretical)
- **Super AI** : Beyond human intelligence (Futuristic concept)

### Level of AI

- **LLM(Large Language Model)**
- **AI Workflow**
- **AI Agents**

### LLM(Large Language Model)

An LLM is a type of AI model trained on vast amounts of text data to understand and generate human-like language.

- Understands context in text
- Generates coherent and relevant responses
- Can answer questions, summarize, translate, write code, etc.
- eg. ChatGPT(based on GPT models), Claude(Anthropic), Gemini(Google), LLaMA(Meta) etc..

LLM is a core tool, not the complete system — it’s the “brain” that powers many AI experiences.

![alt text](<assets/Screenshot (303).png>)

### AI Workflow

An AI workflow is the complete pipeline or process used to build, run, or manage an AI system from input to output.

![alt text](<assets/Screenshot (302).png>)

![alt text](<assets/Screenshot (306).png>)

![alt text](<assets/Screenshot (304).png>)

ReAct - Reasoning then Action

![alt text](<assets/Screenshot (305).png>)

### AI Agents

An AI agent is an autonomous system that uses AI (often including LLMs) to interact with the environment, make decisions, and perform actions toward a goal.
example : manus ai

![alt text](<assets/Screenshot (307).png>)

![alt text](<assets/Screenshot (308).png>)

Types of AI Agents

- **Single AI Agent**
- **Multi Model AI Agent**

### Single AI Agent

A Single AI Agent is an autonomous system designed to accomplish a specific goal or set of tasks independently, by interacting with its environment, using AI capabilities like reasoning, learning, or planning

![alt text](<assets/Screenshot (309).png>)
![alt text](<assets/Screenshot (310).png>)

### Multi Model AI Agent

A Multi-Level AI Model refers to an AI architecture that consists of multiple layers or stages, where each level performs a specific task or abstraction, building on the output of the previous level.

![alt text](<assets/Screenshot (311).png>)

### Pattern of setting AI Agents

- **Sequential Pattern**

![alt text](<assets/Screenshot (312).png>)

- **Hierarchical Pattern**

![alt text](<assets/Screenshot (313).png>)

- **Hybrid Agent Design Pattern**

![alt text](<assets/Screenshot (314).png>)

- **Parallel Agent Design Pattern**

![alt text](<assets/Screenshot (315).png>)

- **Asynchronous Agent Design Pattern**

![alt text](<assets/Screenshot (316).png>)

### Types of AI Agent

- Simple Reflex Agent
- Model Based Reflex Agent
- Goal Based Agent
- Utitlity Based Agent
- Learning Based Agent

- **Simple Reflex Agent**
  A reflective AI agent is an agent that not only acts to achieve its goals, but also thinks about its own actions, evaluates results, and adjusts its behavior based on what it learns.
  A simple reflective agent is the basic version of this: it makes decisions based on past experience and feedback, but doesn't use complex memory or deep reasoning.

![alt text](<assets/Screenshot (317).png>)

- **Model Based Reflex Agent**
  A Model-Based Reflex Agent is an AI agent that makes decisions based on:

1. Current sensor input and
2. A model of the world (i.e., internal memory or representation of how the environment works)

![alt text](<assets/Screenshot (318).png>)

- **Goal Based Agent**
  A Goal-Based Agent is an AI agent that doesn’t just react — it selects and performs actions by considering future goals and how best to achieve them.

![alt text](<assets/Screenshot (319).png>)

- **Utility based AI Agent**
  A Utility-Based Agent is a type of intelligent agent that doesn't just reach a goal — it chooses the best way to reach the goal, based on a utility function that measures how good or how desirable each possible outcome is.

![alt text](<assets/Screenshot (320).png>)

- **Learning based AI Agent**
  A Learning-Based AI Agent is an intelligent agent that can improve its performance over time by learning from experience, data, feedback, or exploration, rather than relying only on hard-coded rules.

![alt text](<assets/Screenshot (321).png>)

### Project

Set up the Script attribute to run the project

```
"scripts": {
    "start": "bun run agent.js",
    "dev": "node --env-file=.env agent.js"
  }
```

Import and initialize groq

```js
import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
```

**Role**
A role defines the function, responsibility, or task an AI agent is meant to perform in a system.

**Persona**
A persona defines the style, tone, personality, or communication behavior of an agent — how it interacts, not just what it does.

**Tools**
In AI — especially with AI agents — a tool is an external function, API, or system that the agent can call or use to perform tasks it can't do by itself.

### About the project

In this Project `llama-3.1-8b-instant` LLM used from Groq interface.
Created 3 tools to track total income, expenses and add income.

![project terminal output](<assets/Screenshot (323).png>)

### Running Application

Package.json

"Script" attribute should set up to run

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run start
```

This project was created using `bun init` in bun v1.2.17. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
