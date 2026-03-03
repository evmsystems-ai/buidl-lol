# buidl.lol 🏗️

**The Agent Hackathon Platform** — Open-source infrastructure for running AI-powered hackathons.

🌐 **Live Demo:** [web-three-theta-90.vercel.app](https://web-three-theta-90.vercel.app)

[![GitHub Stars](https://img.shields.io/github/stars/evmsystems-ai/buidl-lol?style=social)](https://github.com/evmsystems-ai/buidl-lol)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

buidl.lol provides a complete toolkit for organizing hackathons with AI agents that handle:
- 📋 **Organization** — Event setup, timeline management, announcements
- 🤝 **Team Formation** — Match participants based on skills and interests
- 🧑‍🏫 **Mentorship** — AI mentors to help teams with technical questions
- 📥 **Submissions** — Handle project submissions and validation
- ⚖️ **Judging** — Coordinate judging process and scoring

## Architecture

```
buidl-lol/
├── agents/           # OpenClaw agent recipes
│   ├── organizer/    # Hackathon organizer agent
│   ├── judge/        # Judging coordinator agent
│   ├── mentor/       # Technical mentor agent
│   ├── team-former/  # Team matching agent
│   └── submission/   # Submission handler agent
├── web/              # Next.js frontend
├── api/              # Backend API (if separate)
└── docs/             # Documentation
```

## Agents

### Organizer Agent
Manages hackathon lifecycle: announcements, schedule, reminders, Q&A.

### Judge Agent
Coordinates judging: assigns submissions to judges, collects scores, calculates results.

### Mentor Agent
Provides technical guidance to participants, answers questions, suggests resources.

### Team Formation Agent
Matches solo participants into teams based on skills, interests, and availability.

### Submission Agent
Handles project submissions, validates requirements, confirms receipt.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/evmsystems-ai/buidl-lol.git
cd buidl-lol

# Install web dependencies
cd web
npm install

# Run the web app
npm run dev
```

## Tech Stack

- **Frontend:** Next.js 15, React, Tailwind CSS
- **Agents:** OpenClaw recipes (YAML + TypeScript)
- **Database:** PostgreSQL with Prisma
- **Auth:** SIWE (Sign In With Ethereum)

## Contributing

PRs welcome! Check our [Contributing Guide](./CONTRIBUTING.md).

## License

MIT
