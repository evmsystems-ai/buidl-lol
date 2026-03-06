"use client";

import Link from "next/link";

export default function Home() {
  const agents = [
    {
      name: "Organizer",
      description: "Manages hackathon lifecycle, timelines, announcements, and participant communications.",
      icon: "📋",
      status: "online",
    },
    {
      name: "Judge",
      description: "Multi-pass evaluation with anti-gaming detection. Fair scoring at scale.",
      icon: "⚖️",
      status: "online",
    },
    {
      name: "Bounty Distribution",
      description: "Secure multi-sig payments. On-chain USDC or fiat. Automatic winner payouts.",
      icon: "💰",
      status: "standby",
    },
    {
      name: "Dev Rel Support",
      description: "24/7 technical mentoring trained on your SDK docs. Answers questions instantly.",
      icon: "🛠️",
      status: "online",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F17]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F17]/80 backdrop-blur-md border-b border-[#1A1A2E]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl">🏗️</span>
            <span className="text-[#F5F5F5]">buidl.lol</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#agents" className="text-sm text-[#A0A0B0] hover:text-[#FFD700] transition">Agents</a>
            <a href="#how-it-works" className="text-sm text-[#A0A0B0] hover:text-[#FFD700] transition">How it works</a>
            <a href="https://github.com/evmsystems-ai/buidl-lol" target="_blank" rel="noopener noreferrer" className="text-sm text-[#A0A0B0] hover:text-[#FFD700] transition">GitHub</a>
          </div>
          <a
            href="https://github.com/evmsystems-ai/buidl-lol"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A1A2E] border border-[#2D2D3A] text-sm text-[#F5F5F5] hover:border-[#FFD700] transition"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
            Star
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 bg-grid">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-[#1A1A2E] border border-[#2D2D3A] text-sm">
            <span className="w-2 h-2 rounded-full status-online"></span>
            <span className="text-[#00FF88] terminal-text">Open Source</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
            The coordination layer for
            <br />
            <span className="gradient-gold">innovation programs</span>
          </h1>

          <p className="text-lg md:text-xl text-[#A0A0B0] max-w-2xl mx-auto mb-10">
            Run hackathons, bounty programs, and innovation challenges with AI agent operators.
            Self-host or let us manage it for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="/builder"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-xl btn-gold glow-gold"
            >
              Get Started as Builder
            </Link>
            <Link
              href="/organizer"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-xl btn-outline"
            >
              Get Started as Organizer
            </Link>
          </div>

          <p className="text-sm text-[#6B6B7B]">
            MIT Licensed • Self-host anywhere • White-label available
          </p>
        </div>
      </section>

      {/* Product Screenshot */}
      <section className="pb-20 md:pb-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-2xl border border-[#2D2D3A] bg-[#1A1A2E] overflow-hidden shadow-2xl">
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0F0F17] border-b border-[#2D2D3A]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              </div>
              <div className="flex-1 mx-4">
                <div className="w-64 mx-auto bg-[#1A1A2E] rounded px-3 py-1 text-xs text-[#6B6B7B] text-center terminal-text">
                  hub.buidl.lol
                </div>
              </div>
            </div>

            {/* Interface mock */}
            <div className="flex h-[450px] md:h-[500px]">
              {/* Sidebar */}
              <div className="w-56 border-r border-[#2D2D3A] p-4 hidden md:block">
                <button className="w-full flex items-center gap-2 px-3 py-2.5 bg-[#FFD700] text-[#0F0F17] text-sm font-medium rounded-lg mb-4">
                  <span>+</span> New Program
                </button>
                <div className="space-y-1 text-sm">
                  <div className="px-3 py-2 rounded-lg bg-[#2D2D3A] text-[#F5F5F5] flex items-center justify-between">
                    <span>ETH Denver 2026</span>
                    <span className="w-2 h-2 rounded-full bg-[#00FF88]"></span>
                  </div>
                  <div className="px-3 py-2 rounded-lg text-[#6B6B7B] hover:bg-[#2D2D3A]/50 transition">Base Buildathon</div>
                  <div className="px-3 py-2 rounded-lg text-[#6B6B7B] hover:bg-[#2D2D3A]/50 transition">Ongoing Bounties</div>
                </div>
              </div>

              {/* Main area */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 p-6 overflow-auto">
                  <div className="max-w-xl mx-auto space-y-6">
                    {/* Assistant message */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center text-sm flex-shrink-0">🏗️</div>
                      <div className="flex-1">
                        <div className="bg-[#2D2D3A] rounded-2xl rounded-tl-sm px-4 py-3 text-sm">
                          <p className="text-[#F5F5F5] mb-3">I've drafted your hackathon configuration:</p>
                          <div className="bg-[#0F0F17] rounded-lg border border-[#3D3D4A] p-3 terminal-text text-xs space-y-1">
                            <div><span className="text-[#00FF88]">theme:</span> <span className="text-[#FFD700]">"DeFi Innovation"</span></div>
                            <div><span className="text-[#00FF88]">duration:</span> <span className="text-[#F5F5F5]">48h</span></div>
                            <div><span className="text-[#00FF88]">prize_pool:</span> <span className="text-[#F5F5F5]">$25,000 USDC</span></div>
                            <div><span className="text-[#00FF88]">tracks:</span> <span className="text-[#F5F5F5]">[Lending, DEX, Yield]</span></div>
                          </div>
                          <p className="mt-3 text-[#A0A0B0]">Generate challenge descriptions?</p>
                        </div>
                      </div>
                    </div>

                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0F0F17] rounded-2xl rounded-tr-sm px-4 py-3 text-sm max-w-[80%] font-medium">
                        Yes, generate challenges with $5K bounties each
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-[#2D2D3A]">
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#0F0F17] rounded-xl border border-[#2D2D3A] focus-within:border-[#FFD700] transition">
                    <input
                      type="text"
                      placeholder="Describe your innovation program..."
                      className="flex-1 bg-transparent text-sm text-[#F5F5F5] placeholder:text-[#6B6B7B] outline-none"
                      disabled
                    />
                    <button className="w-8 h-8 bg-[#FFD700] rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#0F0F17]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Operators */}
      <section id="agents" className="py-20 md:py-32 border-t border-[#1A1A2E]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Agent <span className="gradient-terminal">Operators</span>
            </h2>
            <p className="text-[#A0A0B0] max-w-xl mx-auto">
              Four specialized AI agents work together to run your innovation program around the clock.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className="p-6 rounded-xl border border-[#2D2D3A] bg-[#1A1A2E]/50 card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2D2D3A] flex items-center justify-center text-2xl flex-shrink-0">
                    {agent.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-[#F5F5F5]">{agent.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${agent.status === 'online' ? 'status-online' : 'bg-[#FFD700]'}`}></span>
                        <span className="text-xs text-[#6B6B7B] terminal-text">{agent.status}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#A0A0B0]">{agent.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 md:py-32 border-t border-[#1A1A2E] bg-[#0A0A12]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-[#A0A0B0] max-w-xl mx-auto">
              Deploy the platform and agents, configure your program, and let AI handle operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Deploy",
                description: "Clone the repo and deploy anywhere. Self-host or use our managed service.",
                code: "git clone evmsystems-ai/buidl-lol",
              },
              {
                step: "02",
                title: "Configure",
                description: "Set up your hackathon or bounty program through the conversational Hub.",
              },
              {
                step: "03",
                title: "Run",
                description: "AI agents handle support, judging, and payouts. You focus on community.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-5xl font-bold text-[#2D2D3A] mb-4 terminal-text">{item.step}</div>
                <h3 className="text-xl font-semibold text-[#F5F5F5] mb-2">{item.title}</h3>
                <p className="text-sm text-[#A0A0B0] mb-3">{item.description}</p>
                {item.code && (
                  <div className="inline-block px-3 py-1.5 bg-[#1A1A2E] rounded-lg border border-[#2D2D3A]">
                    <code className="text-xs text-[#00FF88] terminal-text">{item.code}</code>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OSS Section */}
      <section className="py-20 md:py-32 border-t border-[#1A1A2E]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-gold">Open source</span>, your way
          </h2>
          <p className="text-[#A0A0B0] max-w-2xl mx-auto mb-10">
            buidl.lol is fully open source. Self-host the entire platform and agents,
            or work with us for a managed white-label deployment — like Discourse, but for innovation programs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://github.com/evmsystems-ai/buidl-lol"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-xl btn-gold glow-gold"
            >
              View on GitHub
            </a>
            <a
              href="mailto:matt@evmsystems.ai"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-xl btn-outline"
            >
              Contact for Managed Hosting
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            {[
              { value: "MIT", label: "License" },
              { value: "100%", label: "Open Source" },
              { value: "4", label: "Agent Operators" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-[#FFD700]">{stat.value}</div>
                <div className="text-xs text-[#6B6B7B]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 border-t border-[#1A1A2E] bg-grid">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to coordinate <span className="gradient-gold">innovation</span>?
          </h2>
          <p className="text-[#A0A0B0] max-w-xl mx-auto mb-10">
            Whether you're a builder looking for opportunities or an organizer launching a program.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/builder"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-xl btn-gold glow-gold"
            >
              Get Started as Builder
            </Link>
            <Link
              href="/organizer"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-xl btn-outline"
            >
              Get Started as Organizer
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#1A1A2E]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold">
            <span>🏗️</span>
            <span>buidl.lol</span>
          </div>
          <div className="flex gap-6 text-sm text-[#6B6B7B]">
            <a href="https://github.com/evmsystems-ai/buidl-lol" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition">GitHub</a>
            <a href="https://twitter.com/buidl_lol" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition">Twitter</a>
            <a href="mailto:matt@evmsystems.ai" className="hover:text-[#FFD700] transition">Contact</a>
          </div>
          <div className="text-sm text-[#4B4B5B]">
            Built by <a href="https://evmsystems.ai" className="hover:text-[#FFD700] transition">EVM Systems</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
