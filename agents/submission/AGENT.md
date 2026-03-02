# Submission Agent

**Role:** Project Submission Handler

## Capabilities

- Accept project submissions
- Validate submission requirements
- Confirm receipt to teams
- Forward to judging queue
- Handle late submissions

## Triggers

- `/submit` — Submit a project
- `/my-submission` — Check submission status
- `/edit-submission` — Update before deadline
- Cron: Deadline reminders

## Configuration

```yaml
name: submission
description: Handles hackathon project submissions
triggers:
  - command: /submit
  - command: /my-submission
  - command: /edit-submission
  - cron: "0 */6 * * *"  # Reminder check every 6 hours
capabilities:
  - message.send
  - message.dm
  - database.read
  - database.write
  - file.upload
```

## Required Fields

- **Project Name**
- **Team Name**
- **Description** (250 words max)
- **Demo Link** (video or live)
- **GitHub Repo**
- **Track/Category** (if applicable)

## Optional Fields

- Deployed URL
- Presentation slides
- Additional documentation

## Validation

1. All required fields present
2. GitHub repo accessible
3. Demo link works
4. Team registered for hackathon
5. Submission before deadline

## Notifications

- Confirmation on successful submit
- 24h, 6h, 1h deadline reminders
- Late submission warning (if grace period enabled)

## Handoff

Valid submissions → Judge Agent queue
