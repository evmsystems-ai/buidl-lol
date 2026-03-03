/**
 * Status Tool
 * 
 * Returns current hackathon status, stats, and phase information.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface HackathonStatus {
  name: string;
  phase: 'REGISTRATION' | 'HACKING' | 'SUBMISSION' | 'JUDGING' | 'AWARDS' | 'COMPLETE';
  timeRemaining: string;
  nextDeadline: {
    name: string;
    date: Date;
    timeUntil: string;
  };
  stats: {
    participants: number;
    teams: number;
    submissions: number;
    registrationRate: number;
    submissionRate: number;
  };
  tracks: Array<{
    name: string;
    teams: number;
    submissions: number;
  }>;
}

/**
 * Get current hackathon status
 */
export async function getStatus(hackathonId: string): Promise<HackathonStatus> {
  const hackathon = await prisma.hackathon.findUnique({
    where: { id: hackathonId },
    include: {
      teams: {
        include: {
          members: true,
          submission: true
        }
      },
      submissions: true
    }
  });

  if (!hackathon) {
    throw new Error(`Hackathon ${hackathonId} not found`);
  }

  const now = new Date();
  const config = await loadHackathonConfig();
  
  // Determine current phase
  const phase = determinePhase(now, config.dates);
  
  // Calculate time remaining to next deadline
  const nextDeadline = getNextDeadline(now, config.dates);
  
  // Calculate stats
  const participantCount = hackathon.teams.reduce(
    (sum, team) => sum + team.members.length, 
    0
  );
  const teamCount = hackathon.teams.length;
  const submissionCount = hackathon.submissions.length;
  
  return {
    name: hackathon.name,
    phase,
    timeRemaining: formatTimeRemaining(nextDeadline.date, now),
    nextDeadline: {
      name: nextDeadline.name,
      date: nextDeadline.date,
      timeUntil: formatTimeRemaining(nextDeadline.date, now)
    },
    stats: {
      participants: participantCount,
      teams: teamCount,
      submissions: submissionCount,
      registrationRate: teamCount > 0 ? (participantCount / teamCount) : 0,
      submissionRate: teamCount > 0 ? (submissionCount / teamCount) * 100 : 0
    },
    tracks: config.tracks.map((track: any) => ({
      name: track.name,
      teams: hackathon.teams.filter(t => t.name.includes(track.id)).length, // Simplified
      submissions: hackathon.submissions.filter(s => s.description?.includes(track.id)).length
    }))
  };
}

/**
 * Format status as a Discord message
 */
export function formatStatusMessage(status: HackathonStatus): string {
  const phaseEmoji = {
    REGISTRATION: '📝',
    HACKING: '⚡',
    SUBMISSION: '📦',
    JUDGING: '⚖️',
    AWARDS: '🏆',
    COMPLETE: '✅'
  };

  return `## ${phaseEmoji[status.phase]} ${status.name} Status

**Phase:** ${status.phase}
**Time to ${status.nextDeadline.name}:** ${status.nextDeadline.timeUntil}

### 📊 Stats
| Metric | Count |
|--------|-------|
| 👥 Participants | ${status.stats.participants} |
| 🏠 Teams | ${status.stats.teams} |
| 📦 Submissions | ${status.stats.submissions} |
| 📈 Submission Rate | ${status.stats.submissionRate.toFixed(1)}% |

### 🛤️ Tracks
${status.tracks.map(t => `- **${t.name}:** ${t.teams} teams, ${t.submissions} submitted`).join('\n')}

---
*Last updated: ${new Date().toISOString()}*`;
}

/**
 * Check if phase transition is needed
 */
export async function checkPhaseTransition(hackathonId: string): Promise<{
  transitionNeeded: boolean;
  currentPhase: string;
  newPhase?: string;
}> {
  const config = await loadHackathonConfig();
  const now = new Date();
  
  const hackathon = await prisma.hackathon.findUnique({
    where: { id: hackathonId }
  });

  if (!hackathon) {
    throw new Error(`Hackathon ${hackathonId} not found`);
  }

  const expectedPhase = determinePhase(now, config.dates);
  
  if (hackathon.status !== expectedPhase) {
    return {
      transitionNeeded: true,
      currentPhase: hackathon.status,
      newPhase: expectedPhase
    };
  }

  return {
    transitionNeeded: false,
    currentPhase: hackathon.status
  };
}

// Helper functions

function determinePhase(now: Date, dates: any): HackathonStatus['phase'] {
  const registration_open = new Date(dates.registration_open);
  const hacking_start = new Date(dates.hacking_start);
  const submission_deadline = new Date(dates.submission_deadline);
  const judging_end = new Date(dates.judging_end);
  const awards = new Date(dates.awards);

  if (now < registration_open) return 'REGISTRATION';
  if (now < hacking_start) return 'REGISTRATION';
  if (now < submission_deadline) return 'HACKING';
  if (now < judging_end) return 'JUDGING';
  if (now < awards) return 'JUDGING';
  return 'COMPLETE';
}

function getNextDeadline(now: Date, dates: any): { name: string; date: Date } {
  const deadlines = [
    { name: 'Registration Close', date: new Date(dates.registration_close) },
    { name: 'Hacking Start', date: new Date(dates.hacking_start) },
    { name: 'Submission Deadline', date: new Date(dates.submission_deadline) },
    { name: 'Judging End', date: new Date(dates.judging_end) },
    { name: 'Awards Ceremony', date: new Date(dates.awards) }
  ];

  for (const deadline of deadlines) {
    if (deadline.date > now) {
      return deadline;
    }
  }

  return deadlines[deadlines.length - 1];
}

function formatTimeRemaining(target: Date, now: Date): string {
  const diff = target.getTime() - now.getTime();
  
  if (diff <= 0) return 'NOW';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

async function loadHackathonConfig(): Promise<any> {
  // TODO: Load from config file or database
  return {
    dates: {
      registration_open: '2026-03-01T00:00:00Z',
      registration_close: '2026-03-14T23:59:59Z',
      hacking_start: '2026-03-15T10:00:00Z',
      submission_deadline: '2026-03-22T18:00:00Z',
      judging_end: '2026-03-24T18:00:00Z',
      awards: '2026-03-24T20:00:00Z'
    },
    tracks: [
      { id: 'agent_infra', name: 'Agent Infrastructure' },
      { id: 'economic_agents', name: 'Economic Agents' },
      { id: 'social_agents', name: 'Social Agents' }
    ]
  };
}

export default {
  getStatus,
  formatStatusMessage,
  checkPhaseTransition
};
