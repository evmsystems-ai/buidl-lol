# 🏗️ buidl.lol

**The Agent Hackathon Platform** — Open-source infrastructure for running AI agent hackathons.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Discord](https://img.shields.io/discord/1474465516495310931?color=7289da&label=Discord)](https://discord.gg/evmsystems)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## What is buidl.lol?

buidl.lol (aka "Clawcelerator") is a platform for running AI agent hackathons. It provides:

- 🤖 **Hackathon Agents** — AI agents that automate hackathon operations
- 🏆 **Judging Infrastructure** — Automated submission review and scoring
- 👥 **Team Formation** — AI-assisted team matching
- 📊 **Leaderboard** — Real-time rankings and progress tracking
- 🔧 **Builder Tools** — Templates, starter kits, and resources

## Quick Start

```bash
# Clone the repo
git clone https://github.com/evm-systems/buidl-lol.git
cd buidl-lol

# Install dependencies
pnpm install

# Run the platform
pnpm dev
```

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        buidl.lol Platform                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Organizer  │  │    Judge     │  │   Mentor     │          │
│  │    Agent     │  │    Agent     │  │    Agent     │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                    │
│         └─────────────────┼─────────────────┘                    │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   Agent Orchestrator                     │    │
│  │            (OpenClaw / Custom Runtime)                   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                           │                                      │
│         ┌─────────────────┼─────────────────┐                    │
│         ▼                 ▼                 ▼                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Web App    │  │   Discord    │  │   API        │          │
│  │  (Next.js)   │  │    Bot       │  │  (REST/WS)   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Hackathon Agents

### 1. Organizer Agent 📋
Manages the overall hackathon lifecycle:
- Event setup and configuration
- Timeline management
- Announcements and communications
- Participant onboarding

### 2. Judge Agent ⚖️
Handles submission evaluation:
- Automated code review
- Demo analysis
- Criteria-based scoring
- Feedback generation

### 3. Mentor Agent 🧑‍🏫
Supports participants:
- Technical guidance
- Resource recommendations
- Blocker resolution
- Best practices advice

### 4. Team Formation Agent 👥
Facilitates team building:
- Skill matching
- Interest alignment
- Team composition optimization
- Communication facilitation

### 5. Submission Agent 📦
Manages project submissions:
- Repository validation
- Demo verification
- Documentation checks
- Deadline enforcement

## Project Structure

```
buidl-lol/
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
│
├── agents/                    # Hackathon agent definitions
│   ├── organizer/
│   │   ├── AGENT.md          # Agent specification
│   │   ├── prompts/          # System prompts
│   │   └── tools/            # Custom tools
│   ├── judge/
│   ├── mentor/
│   ├── team-formation/
│   └── submission/
│
├── apps/                      # Applications
│   ├── web/                  # Next.js web app
│   ├── discord-bot/          # Discord bot
│   └── api/                  # REST API server
│
├── packages/                  # Shared packages
│   ├── core/                 # Core types and utilities
│   ├── database/             # Database schema (Prisma)
│   ├── ui/                   # Shared UI components
│   └── agent-sdk/            # Agent development SDK
│
├── docs/                      # Documentation
│   ├── getting-started.md
│   ├── agent-guide.md
│   ├── api-reference.md
│   └── deployment.md
│
└── recipes/                   # OpenClaw recipes
    ├── hackathon-starter/
    └── agent-templates/
```

## Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Core repo structure
- [ ] Basic web app scaffold
- [ ] Database schema
- [ ] Agent SDK foundation
- [ ] Organizer Agent v1

### Phase 2: Agent Suite (Week 3-4)
- [ ] Judge Agent v1
- [ ] Mentor Agent v1
- [ ] Team Formation Agent v1
- [ ] Submission Agent v1
- [ ] Discord integration

### Phase 3: Platform (Week 5-6)
- [ ] Full web interface
- [ ] Leaderboard system
- [ ] Real-time updates
- [ ] Participant dashboard
- [ ] Organizer dashboard

### Phase 4: Polish (Week 7-8)
- [ ] Documentation complete
- [ ] OpenClaw recipes published
- [ ] Security audit
- [ ] Performance optimization
- [ ] Public launch

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Prerequisites
node >= 22
pnpm >= 9

# Setup
pnpm install
cp .env.example .env
pnpm db:push
pnpm dev
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, TailwindCSS, shadcn/ui |
| Backend | Node.js, tRPC, Prisma |
| Database | PostgreSQL |
| Agent Runtime | OpenClaw |
| Real-time | WebSocket, Server-Sent Events |
| Auth | NextAuth.js, SIWE |
| Deployment | Vercel, Railway |

## Community

- **Discord:** [EVM Systems](https://discord.gg/evmsystems)
- **Twitter:** [@evmsystems](https://twitter.com/evmsystems)
- **GitHub:** [evm-systems/buidl-lol](https://github.com/evm-systems/buidl-lol)

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with 🦞 by [EVM Systems](https://evmsystems.ai)
