/**
 * Onboarding Tool
 * 
 * Handles new participant onboarding flow with welcome messages,
 * team formation guidance, and resource sharing.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface OnboardInput {
  userId: string;
  discordId: string;
  role?: 'PARTICIPANT' | 'JUDGE' | 'MENTOR' | 'ORGANIZER';
  teamId?: string;
}

interface OnboardResult {
  success: boolean;
  welcomeMessageSent: boolean;
  roleAssigned: boolean;
  nextSteps: string[];
  error?: string;
}

/**
 * Onboard a new participant
 */
export async function onboardParticipant(input: OnboardInput): Promise<OnboardResult> {
  const { userId, discordId, role = 'PARTICIPANT', teamId } = input;
  const config = await loadHackathonConfig();

  try {
    // 1. Create or update user record
    const user = await prisma.user.upsert({
      where: { id: userId },
      create: {
        id: userId,
        email: `discord_${discordId}@buidl.lol`, // Placeholder
        role: role,
      },
      update: {
        role: role
      }
    });

    // 2. Send welcome DM
    const welcomeMessage = generateWelcomeMessage(role, config);
    await sendDiscordDM(discordId, welcomeMessage);

    // 3. Assign Discord role
    await assignDiscordRole(discordId, role, config.discord.roles[role.toLowerCase()]);

    // 4. If joining a team, add to team
    if (teamId) {
      await prisma.teamMember.create({
        data: {
          userId: user.id,
          teamId: teamId,
          role: 'MEMBER'
        }
      });
    }

    // 5. Determine next steps
    const nextSteps = getNextSteps(role, !!teamId, config);

    return {
      success: true,
      welcomeMessageSent: true,
      roleAssigned: true,
      nextSteps
    };

  } catch (error) {
    console.error('Onboarding failed:', error);
    return {
      success: false,
      welcomeMessageSent: false,
      roleAssigned: false,
      nextSteps: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Generate welcome message based on role
 */
function generateWelcomeMessage(role: string, config: any): string {
  const baseWelcome = `👋 **Welcome to ${config.name}!**\n\n`;

  switch (role) {
    case 'PARTICIPANT':
      return `${baseWelcome}You're registered as a **participant**! Here's your quick start guide:

1️⃣ **Find a team** → Head to <#${config.discord.channels.team_formation}>
   - Introduce yourself with your skills and interests
   - Or post that you're looking for teammates!

2️⃣ **Check the theme** → <#${config.discord.channels.announcements}>
   - This hackathon's theme: "${config.theme}"

3️⃣ **Grab resources** → <#${config.discord.channels.resources}>
   - Starter kits, API keys, and docs

📅 **Key dates:**
• Hacking starts: <t:${toTimestamp(config.dates.hacking_start)}:F>
• Submissions due: <t:${toTimestamp(config.dates.submission_deadline)}:F>

❓ **Questions?** Ask in <#${config.discord.channels.help}> or DM me anytime!

Let's build something awesome! 🚀`;

    case 'JUDGE':
      return `${baseWelcome}You're registered as a **judge**! 

🔐 You have access to the judges-only channel where we'll coordinate scoring.

📅 **Key dates:**
• Submissions close: <t:${toTimestamp(config.dates.submission_deadline)}:F>
• Judging period: <t:${toTimestamp(config.dates.judging_start)}:F> to <t:${toTimestamp(config.dates.judging_end)}:F>
• Awards ceremony: <t:${toTimestamp(config.dates.awards)}:F>

📋 **Judging criteria and rubric** will be shared before judging begins.

Thank you for helping make this hackathon great! 🙏`;

    case 'MENTOR':
      return `${baseWelcome}You're registered as a **mentor**! 

🎓 Your job: Help teams succeed! 

📍 **Where to help:**
• Monitor <#${config.discord.channels.help}> for questions
• Jump into track-specific channels when relevant
• Reach out proactively to teams in your area of expertise

💡 **Tips:**
• Don't solve problems for them — guide them to solutions
• If something's beyond your expertise, tag another mentor
• Have fun! Your energy is contagious

Thank you for giving back to the community! 🙏`;

    case 'ORGANIZER':
      return `${baseWelcome}You're registered as an **organizer**! 

🔐 You have access to organizer channels and admin tools.

⚠️ **Escalations** will come to you for:
• Safety/harassment reports
• Technical issues affecting multiple teams
• Rule exceptions and disputes

Thanks for helping run this hackathon! 🎉`;

    default:
      return baseWelcome;
  }
}

/**
 * Get next steps based on current state
 */
function getNextSteps(role: string, hasTeam: boolean, config: any): string[] {
  const steps: string[] = [];

  if (role === 'PARTICIPANT') {
    if (!hasTeam) {
      steps.push(`Join a team in <#${config.discord.channels.team_formation}>`);
    }
    steps.push('Review the hackathon theme and tracks');
    steps.push('Check out the starter resources');
    steps.push('Start brainstorming project ideas!');
  }

  if (role === 'JUDGE') {
    steps.push('Review the judging rubric (coming soon)');
    steps.push('Block time for judging period');
    steps.push('Introduce yourself in the judges channel');
  }

  if (role === 'MENTOR') {
    steps.push('Introduce yourself in mentor channel');
    steps.push('Set your availability for office hours');
    steps.push('Review sponsor docs for your track');
  }

  return steps;
}

/**
 * Send follow-up for unassigned participants
 */
export async function nudgeUnassigned(hackathonId: string): Promise<{
  nudged: number;
  errors: string[];
}> {
  const config = await loadHackathonConfig();
  
  // Find participants without teams
  const unassigned = await prisma.user.findMany({
    where: {
      role: 'PARTICIPANT',
      teamMemberships: {
        none: {}
      }
    }
  });

  const errors: string[] = [];
  let nudged = 0;

  for (const user of unassigned) {
    try {
      const message = `👋 Hey! I noticed you haven't joined a team yet.

Head to <#${config.discord.channels.team_formation}> to find teammates — or post that you're looking!

🕐 Hacking starts in ${getTimeUntil(config.dates.hacking_start)}.

Need help? Just reply here!`;

      // TODO: Get Discord ID from user record
      // await sendDiscordDM(user.discordId, message);
      nudged++;
    } catch (error) {
      errors.push(`Failed to nudge ${user.id}: ${error}`);
    }
  }

  return { nudged, errors };
}

// Helper functions

function toTimestamp(dateStr: string): number {
  return Math.floor(new Date(dateStr).getTime() / 1000);
}

function getTimeUntil(dateStr: string): string {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'}`;
  }
  return `${hours} hour${hours === 1 ? '' : 's'}`;
}

async function sendDiscordDM(discordId: string, message: string): Promise<void> {
  // This will integrate with OpenClaw's message tool
  console.log(`[Discord DM] To ${discordId}:`, message);
}

async function assignDiscordRole(discordId: string, roleName: string, roleId: string): Promise<void> {
  // This will integrate with Discord API via OpenClaw
  console.log(`[Discord] Assigning role ${roleName} (${roleId}) to ${discordId}`);
}

async function loadHackathonConfig(): Promise<any> {
  // TODO: Load from config file or database
  return {
    name: 'Agent Economy Hack',
    theme: 'Autonomous Economic Actors',
    dates: {
      hacking_start: '2026-03-15T10:00:00Z',
      submission_deadline: '2026-03-22T18:00:00Z',
      judging_start: '2026-03-23T09:00:00Z',
      judging_end: '2026-03-24T18:00:00Z',
      awards: '2026-03-24T20:00:00Z'
    },
    discord: {
      channels: {
        announcements: '1234567890123456789',
        help: '1234567890123456790',
        team_formation: '1234567890123456791',
        resources: '1234567890123456792'
      },
      roles: {
        participant: '1234567890123456795',
        judge: '1234567890123456796',
        mentor: '1234567890123456797',
        organizer: '1234567890123456798'
      }
    }
  };
}

export default {
  onboardParticipant,
  nudgeUnassigned
};
