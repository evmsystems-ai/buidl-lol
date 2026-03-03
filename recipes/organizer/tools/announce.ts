/**
 * Announcement Tool
 * 
 * Sends announcements to hackathon Discord channels.
 * Supports different priority levels and target channels.
 */

import { PrismaClient } from '@prisma/client';

interface AnnounceInput {
  message: string;
  channel?: 'announcements' | 'help' | 'general' | 'all';
  priority?: 'low' | 'medium' | 'high';
  ping?: boolean;
  embed?: {
    title?: string;
    description?: string;
    color?: string;
    fields?: Array<{ name: string; value: string; inline?: boolean }>;
  };
}

interface AnnounceResult {
  success: boolean;
  messageIds: string[];
  channels: string[];
  error?: string;
}

/**
 * Send an announcement to hackathon channels
 * 
 * Priority levels:
 * - low: No ping, regular message
 * - medium: @here ping
 * - high: @everyone ping (use sparingly!)
 */
export async function announce(input: AnnounceInput): Promise<AnnounceResult> {
  const {
    message,
    channel = 'announcements',
    priority = 'medium',
    ping = priority !== 'low',
    embed
  } = input;

  // Load hackathon config
  const config = await loadHackathonConfig();
  
  // Determine target channels
  const targetChannels = channel === 'all' 
    ? ['announcements', 'general']
    : [channel];

  // Build message content
  let content = '';
  
  // Add ping based on priority
  if (ping) {
    switch (priority) {
      case 'high':
        content = '@everyone\n\n';
        break;
      case 'medium':
        content = '@here\n\n';
        break;
    }
  }
  
  content += message;

  // Format embed if provided
  const embeds = embed ? [{
    title: embed.title,
    description: embed.description,
    color: parseColor(embed.color || getColorForPriority(priority)),
    fields: embed.fields,
    footer: {
      text: `${config.name} | buidl.lol`
    },
    timestamp: new Date().toISOString()
  }] : undefined;

  const results: string[] = [];
  const sentChannels: string[] = [];

  // Send to each channel via OpenClaw message tool
  for (const chan of targetChannels) {
    const channelId = config.discord.channels[chan];
    if (!channelId) continue;

    try {
      // This will be replaced by actual OpenClaw message tool call
      const messageId = await sendDiscordMessage({
        channelId,
        content,
        embeds
      });
      
      results.push(messageId);
      sentChannels.push(chan);
    } catch (error) {
      console.error(`Failed to send to ${chan}:`, error);
    }
  }

  return {
    success: results.length > 0,
    messageIds: results,
    channels: sentChannels,
    error: results.length === 0 ? 'Failed to send to any channels' : undefined
  };
}

/**
 * Send a deadline reminder
 */
export async function sendDeadlineReminder(hoursRemaining: number): Promise<AnnounceResult> {
  const config = await loadHackathonConfig();
  
  const urgencyEmoji = hoursRemaining <= 2 ? '🚨' : hoursRemaining <= 6 ? '⏰' : '📢';
  const priority = hoursRemaining <= 2 ? 'high' : hoursRemaining <= 6 ? 'medium' : 'low';
  
  const message = `${urgencyEmoji} **${hoursRemaining} HOUR${hoursRemaining === 1 ? '' : 'S'} REMAINING!**

Submission deadline: <t:${Math.floor(new Date(config.dates.submission_deadline).getTime() / 1000)}:F>

**Your submission needs:**
✅ GitHub repository URL
✅ Demo video (max 3 min)
✅ Project description

**Submit here:** ${config.website}/submit

${hoursRemaining <= 2 ? "⚡ Don't aim for perfect — submit what you have!" : ""}`;

  return announce({
    message,
    channel: 'announcements',
    priority,
    ping: true
  });
}

/**
 * Send daily standup update
 */
export async function sendDailyUpdate(stats: {
  dayNumber: number;
  teamCount: number;
  submissionCount: number;
  timeRemaining: string;
  tip: string;
}): Promise<AnnounceResult> {
  const config = await loadHackathonConfig();
  
  const message = `☀️ **Day ${stats.dayNumber} of ${config.name}**

⏱️ Time remaining: ${stats.timeRemaining}
👥 Teams building: ${stats.teamCount}
📦 Submissions so far: ${stats.submissionCount}

💡 **Today's tip:** ${stats.tip}

Keep building! 🚀`;

  return announce({
    message,
    channel: 'announcements',
    priority: 'low',
    ping: false
  });
}

// Helper functions

function parseColor(color: string): number {
  if (color.startsWith('#')) {
    return parseInt(color.slice(1), 16);
  }
  return parseInt(color, 16);
}

function getColorForPriority(priority: string): string {
  switch (priority) {
    case 'high': return '#FF4444';
    case 'medium': return '#FFB347';
    case 'low': return '#47B347';
    default: return '#5865F2';
  }
}

async function loadHackathonConfig(): Promise<any> {
  // TODO: Load from config file or database
  return {
    name: 'Agent Economy Hack',
    website: 'https://buidl.lol',
    dates: {
      submission_deadline: '2026-03-22T18:00:00Z'
    },
    discord: {
      channels: {
        announcements: process.env.DISCORD_ANNOUNCEMENTS_CHANNEL,
        help: process.env.DISCORD_HELP_CHANNEL,
        general: process.env.DISCORD_GENERAL_CHANNEL
      }
    }
  };
}

async function sendDiscordMessage(params: {
  channelId: string;
  content: string;
  embeds?: any[];
}): Promise<string> {
  // This will integrate with OpenClaw's message tool
  // For now, placeholder that logs the message
  console.log(`[Discord] Sending to ${params.channelId}:`, params.content);
  return 'msg_' + Date.now();
}

export default {
  announce,
  sendDeadlineReminder,
  sendDailyUpdate
};
