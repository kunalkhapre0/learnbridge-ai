# LearnBridge AI

> **Adaptive multi-agent learning support for students without access to private tutoring.**

LearnBridge AI is a **multi-agent educational assistant built with the Strands Agents SDK**. It helps students learn concepts, practice questions, assess their understanding, identify weak areas, and receive personalized study guidance.

The project focuses on using agentic AI for **social good in education**, particularly for students who have limited access to personalized tutoring.

---

## 🎯 Problem

Many students rely on generic learning resources that do not adapt to their individual strengths and weaknesses.

A student may understand one topic but struggle with another, while traditional resources often provide the same learning experience to everyone.

**LearnBridge AI** addresses this by creating an adaptive learning loop:

**Learn → Practice → Assess → Identify Weakness → Adapt**

---

## 💡 Solution

LearnBridge AI uses multiple specialized agents instead of relying on a single chatbot.

### Agent Architecture

```text
                    ┌──────────────────┐
                    │     Student      │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │   Orchestrator   │
                    │      Agent       │
                    └────────┬─────────┘
                             ↓
          ┌──────────────────┼──────────────────┐
          ↓                  ↓                  ↓
   ┌────────────┐     ┌────────────┐     ┌────────────┐
   │ Tutor      │     │ Practice   │     │ Assessment │
   │ Agent      │     │ Agent      │     │ Agent      │
   └────────────┘     └────────────┘     └────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             ↓
                    ┌──────────────────┐
                    │ Learning Planner │
                    │      Agent       │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │   Critic Agent   │
                    └────────┬─────────┘
                             ↓
                    Personalized Response
```

---

## 🤖 Agents

| Agent | Responsibility |
|---|---|
| **Orchestrator Agent** | Coordinates the complete learning workflow |
| **Tutor Agent** | Explains concepts according to the student's level |
| **Practice Agent** | Generates topic-specific practice questions |
| **Assessment Agent** | Evaluates answers and identifies weak concepts |
| **Learning Planner Agent** | Creates personalized next-step study plans |
| **Critic Agent** | Reviews responses for quality, relevance and consistency |

---

## 🔄 How It Works

A typical learning session follows this process:

```text
Student asks a question
        ↓
Tutor explains the concept
        ↓
Practice Agent generates questions
        ↓
Student attempts questions
        ↓
Assessment Agent evaluates performance
        ↓
Weak concepts are identified
        ↓
Learning Planner creates next steps
        ↓
Critic Agent reviews the response
        ↓
Student receives personalized guidance
```

This allows the system to adapt the learning experience instead of simply returning a static answer.

---

## 🌍 Social Impact

LearnBridge AI is designed to support:

- Students with limited access to private tutoring
- First-generation learners
- Students facing language barriers
- Learners who need personalized practice
- Students who need structured study guidance

The long-term goal is to make personalized learning assistance more accessible and affordable.

---

## 🛠️ Technology Stack

- **Python**
- **Strands Agents SDK**
- **Amazon Bedrock-compatible foundation models**
- **FastAPI**
- **HTML / CSS / JavaScript**
- **Boto3**
- **Pytest**

### Potential AWS Architecture

```text
Student
   ↓
API Gateway
   ↓
AWS Lambda
   ↓
Strands Agent System
   ↓
Amazon Bedrock
   ↓
S3 / DynamoDB
```

The current project can also run locally as a prototype without requiring cloud deployment.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kunalkhapre0/learnbridge-ai.git
cd learnbridge-ai
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

Activate it:

**macOS / Linux**

```bash
source .venv/bin/activate
```

**Windows**

```bash
.venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment

Copy:

```bash
cp .env.example .env
```

For local demonstration, the project can run in demo mode without AWS credentials.

For real Strands/Bedrock execution, configure the required AWS credentials and environment variables.

---

## ▶️ Run the Application

Start the backend:

```bash
uvicorn backend.api:app --reload
```

Then open:

```text
http://127.0.0.1:8000
```

---

## 🧪 Run Tests

```bash
pytest
```

The test suite covers the main demo API functionality.

---

## 📁 Project Structure

```text
learnbridge-ai/
│
├── agents/
│   ├── orchestrator.py
│   ├── tutor_agent.py
│   ├── practice_agent.py
│   ├── assessment_agent.py
│   ├── planner_agent.py
│   └── critic_agent.py
│
├── backend/
│   └── api.py
│
├── frontend/
│   └── index.html
│
├── tests/
│   └── test_demo.py
│
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
```

---

## 🔐 Responsible AI

LearnBridge AI is an educational support system and is **not intended to replace teachers or professional educators**.

The system should encourage students to understand concepts rather than blindly copy generated answers.

Any prototype metrics or demonstration results should not be interpreted as measured real-world educational impact.

---

## 🔮 Future Improvements

- Multilingual learning support
- Persistent student profiles
- Long-term progress tracking
- Teacher dashboard
- Accessibility improvements
- More robust educational evaluation
- AWS serverless deployment
- Larger evaluation datasets
- Voice-based learning assistance

---

## 🏆 Hackathon Context

This project was developed for the **AWS Builder Center Strands Agents SDK hackathon** with a focus on applying multi-agent AI to **social good in education**.

The implementation demonstrates how Strands Agents can coordinate specialized agents to create an adaptive learning workflow.

---

## 👨‍💻 Author

**Kunal Khapre**

B.Tech Computer Technology (Artificial Intelligence)  
SAGE University, Indore

GitHub: **[@kunalkhapre0](https://github.com/kunalkhapre0)**

---

## 📜 License

This project is available under the **MIT License**.
