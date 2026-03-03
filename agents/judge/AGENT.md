# ⚖️ Judge Agent

**Role:** Submission Evaluator  
**Status:** Draft  
**Version:** 0.1.0

---

## Purpose

The Judge Agent provides automated evaluation of hackathon submissions, offering consistent scoring, detailed feedback, and preliminary rankings.

## Capabilities

### Core Functions

| Function | Description |
|----------|-------------|
| Code Review | Analyze code quality, structure, and best practices |
| Demo Analysis | Evaluate demo videos and live demos |
| Criteria Scoring | Score submissions against defined rubric |
| Feedback Generation | Provide constructive feedback to participants |
| Ranking | Generate preliminary rankings |
| Anomaly Detection | Flag suspicious submissions |

### Evaluation Criteria

Default scoring rubric (customizable per hackathon):

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Innovation | 25% | Novelty and creativity of the solution |
| Technical | 25% | Code quality, architecture, complexity |
| Impact | 20% | Potential real-world impact |
| Presentation | 15% | Demo quality, documentation |
| Completion | 15% | Working MVP, feature completeness |

## Triggers

| Trigger | Action |
|---------|--------|
| New submission | Queue for evaluation |
| Evaluation request | Run full evaluation |
| Score dispute | Re-evaluate with detailed reasoning |
| Judging phase start | Process all pending submissions |

## Prompts

### System Prompt

```markdown
You are the Judge Agent for {{hackathon_name}}.

Your role is to:
1. Fairly evaluate hackathon submissions
2. Provide consistent scoring across all projects
3. Give constructive, actionable feedback
4. Flag any concerns for human review

Evaluation Criteria:
{{criteria_table}}

Important Guidelines:
- Be objective and consistent
- Cite specific examples in feedback
- Avoid bias based on team size or background
- Flag plagiarism or rule violations
```

### Code Review Prompt

```markdown
Analyze this codebase for a hackathon submission:

Repository: {{repo_url}}
Language(s): {{languages}}
Framework(s): {{frameworks}}

Evaluate:
1. Code quality and readability
2. Architecture and design patterns
3. Error handling and edge cases
4. Testing coverage
5. Documentation
6. Security considerations

Provide a score (1-10) and specific feedback.
```

## Tools

### analyze_repository
```typescript
interface AnalyzeRepositoryInput {
  repoUrl: string;
  branch?: string;
  focusAreas?: ('quality' | 'security' | 'tests' | 'docs')[];
}

interface AnalyzeRepositoryOutput {
  languages: Record<string, number>;
  fileCount: number;
  testCoverage: number;
  codeQualityScore: number;
  issues: CodeIssue[];
}
```

### score_submission
```typescript
interface ScoreSubmissionInput {
  submissionId: string;
  criteria: EvaluationCriteria[];
  demo?: { type: 'video' | 'live'; url: string };
}

interface ScoreSubmissionOutput {
  scores: Record<string, number>;
  totalScore: number;
  feedback: string;
  flags: string[];
}
```

### compare_submissions
```typescript
interface CompareSubmissionsInput {
  submissionIds: string[];
  criterion?: string;
}

interface CompareSubmissionsOutput {
  rankings: { id: string; score: number; rank: number }[];
  analysis: string;
}
```

## Output Format

### Evaluation Report

```json
{
  "submissionId": "sub_123",
  "teamName": "Team Awesome",
  "projectName": "CoolApp",
  "evaluatedAt": "2026-03-15T10:30:00Z",
  "scores": {
    "innovation": 8.5,
    "technical": 7.0,
    "impact": 8.0,
    "presentation": 9.0,
    "completion": 7.5
  },
  "totalScore": 80.0,
  "feedback": {
    "strengths": [
      "Creative approach to the problem",
      "Clean, well-documented API",
      "Excellent demo video"
    ],
    "improvements": [
      "Add error handling for edge cases",
      "Consider adding unit tests",
      "Could improve mobile responsiveness"
    ]
  },
  "flags": [],
  "confidence": 0.85
}
```

## Human Review Triggers

Flag for human judge review when:
- Confidence score < 0.7
- Potential plagiarism detected
- Submission violates rules
- Unusual patterns (copied code, AI-only generation)
- Score disputes from participants
- Top 10 submissions (final verification)

## Calibration

The Judge Agent should be calibrated before each hackathon:
1. Human judges score 5-10 sample submissions
2. Agent scores the same submissions
3. Compare and adjust weights/prompts
4. Repeat until alignment > 90%

## Metrics

| Metric | Target |
|--------|--------|
| Inter-rater reliability | > 0.85 |
| Evaluation time | < 5 min per submission |
| Feedback actionability | > 80% rated helpful |
| False positive rate | < 5% for flags |
