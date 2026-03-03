# 📋 Organizer Agent

**The face of your hackathon** — an OpenClaw-powered Discord bot that runs hackathon operations 24/7.

## What It Does

- Creates hackathon announcements and updates
- Sends deadline reminders automatically
- Answers participant questions (FAQ + context-aware)
- Manages registration and onboarding
- Handles phase transitions (registration → hacking → judging → awards)

## Quick Start

### 1. Prerequisites

- OpenClaw installed and running
- Discord bot token (from [Discord Developer Portal](https://discord.com/developers/applications))
- PostgreSQL database (Neon/Supabase recommended)

### 2. Configuration

Create your hackathon config:

```bash
cp config/hackathon.example.yaml config/hackathon.yaml
```

Edit `config/hackathon.yaml` with your event details:

```yaml
name: "Your Hackathon Name"
theme: "Build something awesome"
dates:
  registration_open: "2026-03-01T00:00:00Z"
  hacking_start: "2026-03-15T09:00:00Z"
  submission_deadline: "2026-03-22T18:00:00Z"
  judging_end: "2026-03-24T23:59:00Z"
discord:
  guild_id: "YOUR_GUILD_ID"
  channels:
    announcements: "announcements"
    help: "help"
    team_formation: "team-formation"
```

### 3. Deploy the Agent

```bash
# Install as OpenClaw skill
openclaw skill install ./recipes/organizer

# Configure Discord integration
openclaw config set discord.token "YOUR_BOT_TOKEN"
openclaw config set discord.guildId "YOUR_GUILD_ID"

# Start the agent
openclaw agent start organizer
```

## Agent Persona

The Organizer is **friendly, clear, and action-oriented**. It:
- Uses emojis naturally (not excessively)
- Gives specific, actionable information
- Knows when to escalate to human organizers
- Maintains the excitement and energy of a hackathon

## Tools Available

### Announcements

```
/announce [message] [priority]
```
Broadcasts to the announcements channel. Priority: low, medium, high.

### Reminders

```
/remind [target] [time] [message]
```
Schedules a reminder. Target: all, team:{name}, user:{id}.

### Status Check

```
/status
```
Returns current hackathon phase, participant count, time remaining.

### Onboard

```
/onboard [user]
```
Sends the welcome flow to a new participant.

## Cron Jobs

The agent runs these automatically:

| Job | Schedule | Description |
|-----|----------|-------------|
| `daily_update` | 09:00 UTC | Morning standup + tips |
| `deadline_reminder` | Every 6h (last 24h) | Submission deadline alerts |
| `phase_check` | Hourly | Auto-transition phases |

## Escalation

The agent escalates to human organizers when:
- Safety/harassment reports
- Technical issues affecting multiple participants
- Rule exception requests
- Prize or judging disputes
- Anything with legal implications

## Customization

### Modify Prompts

Edit `prompts/system.md` to change the agent's personality or add hackathon-specific context.

### Add Custom Tools

Drop TypeScript files in `tools/` — they auto-register with OpenClaw.

### Extend Cron Jobs

Add to `config/cron.yaml` for custom scheduled tasks.

## Files

```
recipes/organizer/
├── SKILL.md           # This file
├── config/
│   ├── hackathon.example.yaml
│   └── cron.yaml
├── prompts/
│   └── system.md      # Agent persona
└── tools/
    ├── announce.ts    # Announcement tool
    ├── remind.ts      # Reminder tool
    ├── status.ts      # Status tool
    └── onboard.ts     # Onboarding tool
```

## Integration Points

- **Discord:** Primary communication channel
- **Database:** PostgreSQL via Prisma (see `packages/database`)
- **OpenClaw:** Agent runtime and tool system

---

Built for [buidl.lol](https://buidl.lol) 🦞
