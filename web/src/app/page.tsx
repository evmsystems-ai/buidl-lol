"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");

  const agents = [
    {
      name: "Organizer",
      emoji: "📋",
      description: "Manages events, timelines, announcements, and participant communications",
      capabilities: ["Create hackathons", "Send announcements", "Schedule management", "FAQ handling"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Team Former",
      emoji: "🤝",
      description: "Intelligently matches solo participants into balanced, high-performing teams",
      capabilities: ["Skill-based matching", "Timezone alignment", "Interest pairing", "Team optimization"],
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Mentor",
      emoji: "🧑‍🏫",
      description: "24/7 technical guidance, resource suggestions, and expert escalation",
      capabilities: ["Answer questions", "Suggest resources", "Debug assistance", "Office hours booking"],
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Submission",
      emoji: "📥",
      description: "Handles project intake, validates requirements, and confirms submissions",
      capabilities: ["Accept submissions", "Validate requirements", "Deadline reminders", "Edit handling"],
      color: "from-orange-500 to-yellow-500",
    },
    {
      name: "Judge",
      emoji: "⚖️",
      description: "Coordinates fair scoring, manages judges, and calculates final results",
      capabilities: ["Assign judges", "Collect scores", "Anti-collusion", "Results tabulation"],
      color: "from-red-500 to-rose-500",
    },
  ];

  const steps = [
    { num: "01", title: "Clone the Recipe", desc: "Fork the repo and configure your agents in minutes" },
    { num: "02", title: "Connect Your Channels", desc: "Discord, Slack, Telegram — wherever your community lives" },
    { num: "03", title: "Launch Your Hackathon", desc: "Agents handle the rest: teams, mentoring, submissions, judging" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      {/* Nav */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-xl font-bold">🏗️ buidl.lol</div>
        <div className="flex items-center gap-6">
          <a href="#agents" className="text-gray-400 hover:text-white transition">Agents</a>
          <a href="#how-it-works" className="text-gray-400 hover:text-white transition">How It Works</a>
          <a href="#dashboard" className="text-gray-400 hover:text-white transition">Dashboard</a>
          <a
            href="https://github.com/evmsystems-ai/buidl-lol"
            target="_blank"
            className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <header className="container mx-auto px-6 py-20 text-center">
        <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6">
          Open Source • Agent-Native • Community Driven
        </div>
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
          Run Hackathons<br />with AI Agents
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The complete open-source platform for AI-powered hackathons. 
          Deploy a fleet of agents that handle team formation, mentorship, 
          submissions, and judging — so you can focus on community.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="https://github.com/evmsystems-ai/buidl-lol"
            target="_blank"
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 font-semibold rounded-xl hover:opacity-90 transition text-lg"
          >
            🚀 Clone the Recipe
          </a>
          <a
            href="https://github.com/evmsystems-ai/buidl-lol"
            target="_blank"
            className="px-8 py-4 border border-gray-600 rounded-xl hover:border-gray-400 transition text-lg"
          >
            ⭐ Star on GitHub
          </a>
        </div>
        <p className="text-gray-500 text-sm mt-6">
          Free forever • No vendor lock-in • Deploy anywhere
        </p>
      </header>

      {/* Agent Fleet */}
      <section id="agents" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Your Agent Fleet</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Five specialized AI agents work together to run your hackathon. 
            Each handles a critical function, all coordinating seamlessly.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition group"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition`}
              >
                {agent.emoji}
              </div>
              <h3 className="text-xl font-semibold mb-2">{agent.name} Agent</h3>
              <p className="text-gray-400 mb-4">{agent.description}</p>
              <div className="flex flex-wrap gap-2">
                {agent.capabilities.map((cap) => (
                  <span key={cap} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {/* Clone CTA Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex flex-col justify-center items-center text-center">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold mb-2">Build Your Own</h3>
            <p className="text-gray-400 mb-4">Add custom agents for your specific hackathon needs</p>
            <a
              href="https://github.com/evmsystems-ai/buidl-lol/tree/main/agents"
              target="_blank"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              View Agent Specs →
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Launch in 3 Steps</h2>
          <p className="text-gray-400 text-lg">From zero to running hackathon in under an hour</p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="text-5xl font-bold text-purple-500/30 mb-4">{step.num}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="https://github.com/evmsystems-ai/buidl-lol#quick-start"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition"
          >
            📖 Read the Quick Start Guide
          </a>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="dashboard" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Dashboard</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Monitor participants, teams, submissions, and agent activity in real-time
          </p>
        </div>
        
        {/* Dashboard Preview Mock */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden shadow-2xl">
          {/* Mock Browser Chrome */}
          <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-700 rounded px-3 py-1 text-sm text-gray-400 max-w-md mx-auto">
                buidl.lol/dashboard
              </div>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="p-6">
            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: "Participants", value: "156", icon: "👥", change: "+12 today" },
                { label: "Teams", value: "42", icon: "🤝", change: "3 forming" },
                { label: "Submissions", value: "28", icon: "📥", change: "14 pending" },
                { label: "Agents Active", value: "5/5", icon: "🤖", change: "All running" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{stat.icon}</span>
                    <span className="text-xs text-green-400">{stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Activity Feed */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl bg-gray-800/50 border border-gray-700 p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <span>📊</span> Live Activity
                </h4>
                <div className="space-y-3 text-sm">
                  {[
                    { time: "2m ago", event: "Mentor Agent answered question in #help", color: "text-green-400" },
                    { time: "5m ago", event: "Team 'Web3 Wizards' formed (4 members)", color: "text-purple-400" },
                    { time: "8m ago", event: "New submission: 'DeFi Dashboard'", color: "text-orange-400" },
                    { time: "12m ago", event: "Organizer sent deadline reminder", color: "text-blue-400" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-gray-500 text-xs w-14">{item.time}</span>
                      <span className={item.color}>•</span>
                      <span className="text-gray-300">{item.event}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-xl bg-gray-800/50 border border-gray-700 p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <span>🤖</span> Agent Status
                </h4>
                <div className="space-y-3">
                  {[
                    { name: "Organizer", status: "Active", action: "Monitoring schedule" },
                    { name: "Team Former", status: "Active", action: "3 matches pending" },
                    { name: "Mentor", status: "Active", action: "47 questions answered" },
                    { name: "Submission", status: "Active", action: "Validating 2 projects" },
                    { name: "Judge", status: "Standby", action: "Awaiting deadline" },
                  ].map((agent) => (
                    <div key={agent.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${agent.status === "Active" ? "bg-green-500" : "bg-gray-500"}`}></span>
                        <span>{agent.name}</span>
                      </div>
                      <span className="text-gray-400 text-xs">{agent.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <a
            href="/dashboard"
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Explore the Full Dashboard →
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">🔧 For Organizers</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-white">One-click setup</strong> — Deploy a full hackathon stack in minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-white">Automated comms</strong> — Announcements, reminders, and updates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-white">Smart team matching</strong> — AI pairs participants by skills</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-white">Fair judging</strong> — Anti-collusion, blind scoring, transparency</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-white">Full analytics</strong> — Engagement metrics and insights</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">🚀 For Participants</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-white">24/7 AI mentor</strong> — Get help anytime, on any topic</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-white">Find teammates</strong> — Smart matching with compatible builders</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-white">Easy submissions</strong> — Simple process with validation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-white">Real-time updates</strong> — Never miss a deadline or announcement</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-white">Transparent results</strong> — See how your project was scored</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-500/20">
          <h2 className="text-4xl font-bold mb-4">Ready to buidl?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Clone the recipe, configure your agents, and launch your hackathon today.
            It's free, open-source, and yours forever.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://github.com/evmsystems-ai/buidl-lol"
              target="_blank"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:opacity-90 transition text-lg"
            >
              🚀 Clone the Recipe
            </a>
            <a
              href="https://discord.gg/buidl"
              target="_blank"
              className="px-8 py-4 border border-gray-600 rounded-xl hover:border-gray-400 transition text-lg"
            >
              💬 Join Discord
            </a>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="container mx-auto px-6 py-16 text-center">
        <p className="text-gray-400 mb-4">
          Want hosted hackathons? Join the waitlist for buidl.lol Cloud
        </p>
        <form
          className="flex gap-3 max-w-md mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks! We'll be in touch.");
            setEmail("");
          }}
        >
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-purple-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition"
          >
            Notify Me
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xl font-bold">🏗️ buidl.lol</div>
            <div className="flex gap-8 text-gray-400">
              <a href="https://github.com/evmsystems-ai/buidl-lol" target="_blank" className="hover:text-white">GitHub</a>
              <a href="https://github.com/evmsystems-ai/buidl-lol/tree/main/agents" target="_blank" className="hover:text-white">Docs</a>
              <a href="https://discord.gg/buidl" target="_blank" className="hover:text-white">Discord</a>
              <a href="https://twitter.com/buidl_lol" target="_blank" className="hover:text-white">Twitter</a>
            </div>
            <p className="text-gray-500 text-sm">
              Built with 🤖 by <a href="https://evmsystems.ai" className="text-gray-400 hover:text-white">EVM Systems</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
