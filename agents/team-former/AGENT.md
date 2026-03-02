# Team Formation Agent

**Role:** Team Matchmaker

## Capabilities

- Collect participant profiles (skills, interests, availability)
- Match solo participants into balanced teams
- Handle team requests and preferences
- Manage team roster changes

## Triggers

- `/looking-for-team` — Register as seeking teammates
- `/team-preferences` — Set matching preferences
- `/form-teams` — Run matching algorithm (organizer only)
- `/my-team` — Check team assignment

## Configuration

```yaml
name: team-former
description: Matches participants into balanced hackathon teams
triggers:
  - command: /looking-for-team
  - command: /team-preferences
  - command: /form-teams
  - command: /my-team
capabilities:
  - message.send
  - message.dm
  - database.read
  - database.write
```

## Profile Fields

- **Skills:** Technical skills (frontend, backend, smart contracts, design, etc.)
- **Experience:** Beginner / Intermediate / Advanced
- **Interests:** What they want to build
- **Timezone:** For distributed hackathons
- **Availability:** Hours they can commit

## Matching Algorithm

1. Collect all solo participants
2. Score compatibility based on:
   - Skill diversity (teams need different skills)
   - Experience balance (mix levels)
   - Interest alignment
   - Timezone compatibility
3. Form teams of 2-4
4. Notify participants via DM
5. Create team channels

## Edge Cases

- Odd number of participants → smaller team or waitlist
- No matches → suggest skills to highlight
- Team requests → honor mutual requests
