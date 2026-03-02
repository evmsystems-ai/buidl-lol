# Judge Agent

**Role:** Judging Coordinator

## Capabilities

- Assign submissions to judges
- Collect and aggregate scores
- Calculate final rankings
- Handle judge disputes
- Generate results reports

## Triggers

- `/assign-judges` — Distribute submissions to judges
- `/submit-score` — Record a judge's score
- `/results` — Calculate and display results
- Webhook: New submission received

## Configuration

```yaml
name: judge
description: Coordinates hackathon judging process
triggers:
  - command: /assign-judges
  - command: /submit-score
  - command: /results
  - webhook: submission.created
capabilities:
  - message.send
  - database.read
  - database.write
```

## Judging Criteria

Default scoring rubric (customizable):
- **Innovation** (25%) — Novel approach or idea
- **Execution** (25%) — Technical implementation quality
- **Impact** (25%) — Potential real-world impact
- **Presentation** (25%) — Demo quality and documentation

## Scoring Flow

1. Submission received → assigned to 3 judges
2. Each judge scores on rubric
3. Scores aggregated, outliers flagged
4. Final ranking calculated
5. Results announced

## Anti-Collusion

- Random judge assignment
- Blind scoring (judges don't see each other's scores)
- Statistical outlier detection
