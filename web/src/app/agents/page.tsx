"use client";

import { useState } from "react";

interface AgentConfig {
  id: string;
  name: string;
  emoji: string;
  description: string;
  status: "active" | "inactive" | "configuring";
  triggers: string[];
  lastRun?: string;
  actions: number;
}

export default function AgentsPage() {
  const [agents] = useState<AgentConfig[]>([
    {
      id: "organizer",
      name: "Organizer Agent",
      emoji: "📋",
      description: "Manages hackathon events, timelines, and announcements",
      status: "active",
      triggers: ["/create-hackathon", "/announce", "/schedule", "cron: 9am daily"],
      lastRun: "2 min ago",
      actions: 47,
    },
    {
      id: "team-former",
      name: "Team Formation Agent",
      emoji: "🤝",
      description: "Matches solo participants into balanced teams",
      status: "active",
      triggers: ["/looking-for-team", "/team-preferences", "/form-teams"],
      lastRun: "15 min ago",
      actions: 23,
    },
    {
      id: "mentor",
      name: "Mentor Agent",
      emoji: "🧑‍🏫",
      description: "Provides technical guidance and answers questions",
      status: "active",
      triggers: ["/ask", "/resources", "/office-hours", "channel: #help"],
      lastRun: "1 min ago",
      actions: 156,
    },
    {
      id: "submission",
      name: "Submission Agent",
      emoji: "📥",
      description: "Handles project submissions and validation",
      status: "active",
      triggers: ["/submit", "/my-submission", "/edit-submission"],
      lastRun: "5 min ago",
      actions: 28,
    },
    {
      id: "judge",
      name: "Judge Agent",
      emoji: "⚖️",
      description: "Coordinates judging, scoring, and results",
      status: "inactive",
      triggers: ["/assign-judges", "/submit-score", "/results"],
      actions: 0,
    },
  ]);

  const statusColors = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    inactive: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    configuring: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold">
            🏗️ buidl.lol
          </a>
          <nav className="flex items-center gap-6">
            <a href="/dashboard" className="text-gray-400 hover:text-white">
              Dashboard
            </a>
            <a href="/agents" className="text-purple-400">
              Agents
            </a>
            <button className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium hover:bg-purple-500">
              New Hackathon
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Hackathon Agents</h1>
            <p className="text-gray-400 mt-1">
              Configure and monitor your AI agents
            </p>
          </div>
          <button className="px-4 py-2 border border-gray-700 rounded-lg hover:border-gray-600">
            + Add Custom Agent
          </button>
        </div>

        {/* Agents Grid */}
        <div className="space-y-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="p-6 rounded-xl bg-gray-900 border border-gray-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl">
                    {agent.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold">{agent.name}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[agent.status]}`}
                      >
                        {agent.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">
                      {agent.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {agent.triggers.map((trigger) => (
                        <span
                          key={trigger}
                          className="px-2 py-1 rounded bg-gray-800 text-xs font-mono"
                        >
                          {trigger}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-4 mb-2">
                    {agent.lastRun && (
                      <span className="text-sm text-gray-400">
                        Last run: {agent.lastRun}
                      </span>
                    )}
                    <span className="text-sm font-medium">
                      {agent.actions} actions
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">
                      Logs
                    </button>
                    <button className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">
                      Configure
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        agent.status === "active"
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      }`}
                    >
                      {agent.status === "active" ? "Stop" : "Start"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Documentation */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <h3 className="text-lg font-semibold mb-2">📚 Agent Documentation</h3>
          <p className="text-gray-400 mb-4">
            Learn how to customize agents, add new triggers, and integrate with
            your existing tools.
          </p>
          <a
            href="https://github.com/evmsystems-ai/buidl-lol/tree/main/agents"
            target="_blank"
            className="text-purple-400 hover:text-purple-300"
          >
            View on GitHub →
          </a>
        </div>
      </main>
    </div>
  );
}
