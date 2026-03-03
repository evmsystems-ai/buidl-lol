# buidl.lol Pod Configuration

## Agents

| Agent | Channel | Focus | Status |
|-------|---------|-------|--------|
| `bl-front-end` | #design | Next.js app, UI, React components | 🟡 Spawning |
| `bl-back-end` | #engineering | API, database, Prisma, business logic | 🟡 Spawning |
| `bl-agents` | #agents | Hackathon agents (organizer, judge, mentor) | 🟡 Spawning |
| `bl-infra` | #engineering | CI/CD, configs, DevOps | 🟡 Spawning |

## Channel IDs (Discord)

```
Category: 🏗️ buidl.lol (1478129116619342049)
├── #general      (1478129158117916734)
├── #engineering  (1478129161045545224)
├── #roadmap      (1478129162630987932)
├── #agents       (1478129164417634407)
├── #design       (1478129166116454595)
├── #bl-infra     (1478132890343571506)  ← Agent channel
├── #bl-back-end  (1478132892176613497)  ← Agent channel
├── #bl-front-end (1478132893984231478)  ← Agent channel
└── #bl-agents    (1478132896303677692)  ← Agent channel
```

## Workspace

All agents work in: `projects/buidl-lol/`

```
apps/
├── web/              # bl-front-end
└── api/              # bl-back-end (if separate)

packages/
├── core/             # Shared types, Agent SDK
├── database/         # Prisma schema + client
└── config/           # ESLint, TS configs

agents/
├── organizer/        # bl-agents
├── judge/            # bl-agents
├── mentor/           # bl-agents
└── team-formation/   # bl-agents

.github/              # bl-infra
```

## Current Sprint: Phase 1 Week 1

**Priority:**
1. bl-infra: CI/CD + shared configs
2. bl-back-end: Database schema + Prisma
3. bl-front-end: Web app scaffold
4. bl-agents: Agent SDK foundation

## Coordination

- Roadmap/Planning: #roadmap
- Cross-agent sync: #general
- Papi coordinates all pods
