# buidl.lol UI Specification

## Design Philosophy

**Chat-first, agent-driven hackathon platform.**

Inspired by: ChatGPT, Linear, Notion
NOT like: Traditional hackathon dashboards with overwhelming cards

## Core Principles

1. **Conversation is the interface** — Talk to agents, don't click through menus
2. **Minimal chrome** — Content over UI decoration
3. **Smooth & quiet** — Subtle animations, muted colors, no visual noise
4. **Context-aware** — UI adapts based on hackathon phase

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  ◉ buidl.lol                              [Wallet] [?]     │
├────────────┬────────────────────────────────────────────────┤
│            │                                                │
│  SIDEBAR   │              MAIN CONTENT                      │
│            │                                                │
│  Agents    │   ┌────────────────────────────────────────┐  │
│  ├ Mentor  │   │                                        │  │
│  ├ Team    │   │         CHAT / CONTENT AREA            │  │
│  ├ Submit  │   │                                        │  │
│  └ Judge   │   │                                        │  │
│            │   │                                        │  │
│  ────────  │   └────────────────────────────────────────┘  │
│            │                                                │
│  Resources │   ┌────────────────────────────────────────┐  │
│  ├ Rules   │   │  Message input...              [Send]  │  │
│  ├ Schedule│   └────────────────────────────────────────┘  │
│  ├ Prizes  │                                                │
│  └ Teams   │                                                │
│            │                                                │
└────────────┴────────────────────────────────────────────────┘
```

---

## Color Palette

```css
--bg-primary: #0a0a0a;      /* Near black */
--bg-secondary: #141414;    /* Panels */
--bg-tertiary: #1a1a1a;     /* Hover states */
--border: #2a2a2a;          /* Subtle borders */
--text-primary: #fafafa;    /* White text */
--text-secondary: #888888;  /* Muted text */
--accent: #10b981;          /* Green - success/active */
--accent-subtle: #10b98120; /* Green with opacity */
```

No bright purples/pinks. Clean, professional, muted.

---

## Components

### 1. Sidebar (240px fixed)

```
◉ buidl.lol

AGENTS
  ◉ Mentor Agent        [active]
  ○ Team Former
  ○ Submission
  ○ Judge

RESOURCES  
  📋 Rules & Guidelines
  📅 Schedule
  🏆 Prizes
  👥 My Team
  📁 My Submissions

HACKATHON
  AI Agents Hackathon
  Mar 15-22, 2026
  ━━━━━━━━━━ 45% complete
```

### 2. Chat Interface

Main interaction area. Messages from user and agent responses.

```
┌─────────────────────────────────────────┐
│ 🧑‍🏫 Mentor Agent                        │
├─────────────────────────────────────────┤
│                                         │
│  You: How do I integrate OpenAI?       │
│                                         │
│  Mentor: Here's a quick guide...       │
│  [code block with syntax highlighting]  │
│                                         │
│  You: Can you review my architecture?  │
│                                         │
│  Mentor: Looking at your repo...       │
│  [structured feedback]                  │
│                                         │
├─────────────────────────────────────────┤
│ Type a message...                [Send] │
└─────────────────────────────────────────┘
```

### 3. Resource Panels (Slide-in)

When clicking a resource, slides in from right:

```
┌─────────────────────────────────┐
│ Schedule                    [×] │
├─────────────────────────────────┤
│                                 │
│ Mar 15 ─── Kickoff              │
│            ├ Opening ceremony   │
│            └ Team formation     │
│                                 │
│ Mar 18 ─── Midpoint Check       │
│            └ Optional demos     │
│                                 │
│ Mar 22 ─── Submission Deadline  │
│            └ 11:59 PM UTC       │
│                                 │
│ Mar 23 ─── Judging              │
│                                 │
│ Mar 24 ─── Winners Announced    │
│                                 │
└─────────────────────────────────┘
```

### 4. Command Palette (⌘K)

Quick access to everything:

```
┌─────────────────────────────────────────┐
│ 🔍 Search or type a command...          │
├─────────────────────────────────────────┤
│ AGENTS                                  │
│   Talk to Mentor Agent                  │
│   Find teammates                        │
│   Submit project                        │
│                                         │
│ ACTIONS                                 │
│   View schedule                         │
│   Check prizes                          │
│   See my team                           │
│                                         │
│ RECENT                                  │
│   Last conversation with Mentor         │
└─────────────────────────────────────────┘
```

---

## Page Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing (marketing) |
| `/h/[slug]` | Hackathon home → Chat with agents |
| `/h/[slug]/chat/[agent]` | Direct chat with specific agent |
| `/h/[slug]/submit` | Submission flow (guided by agent) |
| `/h/[slug]/team` | Team management |
| `/organize` | Create/manage hackathons |

---

## Interactions

### Agent Selection
- Click agent in sidebar → Chat loads
- Agent greeting appears
- Input focuses automatically

### Resource Access
- Click resource → Panel slides in from right
- Click outside or [×] → Panel closes
- No full page navigation for resources

### Submissions
- "Submit project" → Submission agent guides via chat
- Agent asks questions one-by-one
- Final confirmation before submit

### Team Formation
- "Find teammates" → Team Former agent
- Describe what you're looking for
- Agent suggests matches
- One-click invite

---

## Typography

```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

--text-xs: 12px;
--text-sm: 14px;
--text-base: 15px;
--text-lg: 18px;
--text-xl: 24px;
```

---

## Animation Guidelines

- **Duration:** 150-200ms for micro-interactions
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out)
- **No bouncing** — Keep it professional
- **Subtle opacity** transitions on hover

---

## Mobile (< 768px)

- Sidebar becomes bottom sheet
- Agents accessible via bottom nav
- Chat takes full screen
- Resources open as full-screen modal

---

## Reference Implementations

Study these for inspiration:
- **ChatGPT** — Chat interface, sidebar, minimal chrome
- **Linear** — Clean UI, command palette, smooth animations
- **Notion** — Sidebar navigation, content blocks
- **Vercel Dashboard** — Minimal, professional, dark mode

NOT these (too busy):
- Devpost (cluttered cards)
- Old hackathon.io (dated UI)

---

*This spec should guide all frontend development. When in doubt, choose minimal.*
