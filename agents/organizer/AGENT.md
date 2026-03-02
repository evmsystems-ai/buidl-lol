# Organizer Agent

**Role:** Hackathon Event Manager

## Capabilities

- Create and manage hackathon events
- Send announcements to participants
- Manage schedule and timeline
- Answer FAQ questions
- Coordinate with other agents

## Triggers

- `/create-hackathon` — Initialize a new hackathon
- `/announce` — Send announcement to all participants
- `/schedule` — Display or update schedule
- `/faq` — Answer common questions

## Configuration

```yaml
name: organizer
description: Manages hackathon events and communications
triggers:
  - command: /create-hackathon
  - command: /announce
  - command: /schedule
  - cron: "0 9 * * *"  # Daily check-in
capabilities:
  - message.send
  - database.read
  - database.write
```

## State

Tracks:
- Hackathon details (name, dates, prizes, sponsors)
- Participant list
- Schedule/timeline
- Announcements sent

## Integration Points

- **Discord/Slack:** Post announcements
- **Database:** Store hackathon data
- **Team Former:** Trigger team matching
- **Submission Agent:** Open/close submissions
