# Contributing to buidl.lol

First off, thank you for considering contributing to buidl.lol! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)
- [Agent Development](#agent-development)
- [Community](#community)

## Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/). Please be respectful and inclusive in all interactions.

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 9+
- PostgreSQL 15+
- Git

### Local Development Setup

```bash
# 1. Fork and clone the repo
git clone https://github.com/YOUR_USERNAME/buidl-lol.git
cd buidl-lol

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your local config

# 4. Set up the database
pnpm db:push

# 5. Start development server
pnpm dev
```

### Project Structure Overview

```
buidl-lol/
├── agents/          # Agent definitions and prompts
├── apps/            # Applications (web, bot, api)
├── packages/        # Shared packages
├── docs/            # Documentation
└── recipes/         # OpenClaw recipes
```

## Development Workflow

### Branch Naming

Use descriptive branch names:

- `feature/add-mentor-agent` — New features
- `fix/judge-scoring-bug` — Bug fixes
- `docs/api-reference` — Documentation
- `refactor/agent-sdk` — Code refactoring

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(agent): add mentor agent implementation
fix(judge): correct scoring calculation
docs: update API reference
chore: bump dependencies
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for a specific package
pnpm test --filter @buidl/core

# Run tests in watch mode
pnpm test:watch
```

### Linting and Formatting

```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm typecheck
```

## Pull Request Process

### Before Opening a PR

1. ✅ Code compiles without errors
2. ✅ All tests pass
3. ✅ Linting passes
4. ✅ Documentation updated (if needed)
5. ✅ Changelog updated (for significant changes)

### PR Template

When opening a PR, include:

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] My code follows the project style guide
- [ ] I have added tests
- [ ] I have updated documentation
- [ ] My changes don't break existing functionality
```

### Review Process

1. Open a PR against `main`
2. Request review from maintainers
3. Address feedback
4. Once approved, a maintainer will merge

## Style Guide

### TypeScript

```typescript
// ✅ Good
interface Agent {
  id: string;
  name: string;
  capabilities: string[];
}

async function createAgent(config: AgentConfig): Promise<Agent> {
  // Implementation
}

// ❌ Bad
function createAgent(config: any) {
  // No types, no async
}
```

### React Components

```tsx
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ variant, onClick, children }: ButtonProps) {
  return (
    <button className={styles[variant]} onClick={onClick}>
      {children}
    </button>
  );
}

// ❌ Bad
export default function Button(props) {
  return <button {...props} />;
}
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `AgentCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Types: `types.ts` or `*.types.ts`
- Tests: `*.test.ts` or `*.spec.ts`

## Agent Development

### Creating a New Agent

1. Create a folder in `agents/`:

```
agents/my-agent/
├── AGENT.md          # Agent specification
├── prompts/
│   ├── system.md     # System prompt
│   └── tools.md      # Tool descriptions
├── tools/
│   └── myTool.ts     # Custom tools
└── tests/
    └── agent.test.ts
```

2. Define the agent spec in `AGENT.md`:

```markdown
# My Agent

## Purpose
What does this agent do?

## Capabilities
- Capability 1
- Capability 2

## Triggers
When should this agent activate?

## Outputs
What does this agent produce?
```

3. Write the system prompt in `prompts/system.md`

4. Add any custom tools in `tools/`

5. Write tests in `tests/`

### Agent Guidelines

- **Single Responsibility:** Each agent should have one clear purpose
- **Stateless:** Agents should be stateless when possible
- **Testable:** All agent behaviors should be testable
- **Observable:** Log important decisions and actions

## Community

### Getting Help

- **Discord:** Join our [Discord server](https://discord.gg/evmsystems)
- **GitHub Issues:** For bugs and feature requests
- **Discussions:** For questions and ideas

### Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- Our Discord community

## Thank You! 🙏

Every contribution matters. Whether it's:
- Fixing a typo
- Reporting a bug
- Suggesting a feature
- Writing documentation
- Submitting code

We appreciate you!
