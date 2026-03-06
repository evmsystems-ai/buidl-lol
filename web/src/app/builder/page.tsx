"use client";

import Link from "next/link";

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-[#0F0F17]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F17]/80 backdrop-blur-md border-b border-[#1A1A2E]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl">🏗️</span>
            <span className="text-[#F5F5F5]">buidl.lol</span>
          </Link>
          <Link href="/organizer" className="text-sm text-[#A0A0B0] hover:text-[#FFD700] transition">
            I'm an Organizer →
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-[#1A1A2E] border border-[#2D2D3A] text-sm text-[#A0A0B0]">
              For Builders
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Find opportunities,
              <br />
              <span className="gradient-gold">build, get paid</span>
            </h1>
            <p className="text-lg text-[#A0A0B0] max-w-xl mx-auto">
              Discover hackathons, bounty programs, and innovation challenges.
              Get matched with teams, receive 24/7 support, and earn rewards.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-12">
            {[
              {
                step: "1",
                title: "Clone the repo",
                description: "Get started with the buidl.lol platform locally or browse live instances.",
                code: "git clone https://github.com/evmsystems-ai/buidl-lol.git",
              },
              {
                step: "2",
                title: "Browse active programs",
                description: "Find hackathons, bounties, and challenges that match your skills and interests.",
              },
              {
                step: "3",
                title: "Build and submit",
                description: "Work solo or get matched with a team. The Dev Rel Support agent provides 24/7 help.",
              },
              {
                step: "4",
                title: "Get evaluated and paid",
                description: "AI-powered judging ensures fair evaluation. Automatic payouts via Bounty Distribution.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-6 rounded-xl border border-[#2D2D3A] bg-[#1A1A2E]/50 card-hover">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-[#0F0F17] flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#F5F5F5] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#A0A0B0] mb-3">{item.description}</p>
                  {item.code && (
                    <div className="bg-[#0F0F17] rounded-lg px-4 py-3 border border-[#2D2D3A] overflow-x-auto">
                      <code className="text-sm text-[#00FF88] terminal-text">{item.code}</code>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://github.com/evmsystems-ai/buidl-lol"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl btn-gold glow-gold"
            >
              Get Started on GitHub
            </a>
            <p className="mt-4 text-sm text-[#6B6B7B]">
              Or find a <a href="#" className="text-[#FFD700] hover:underline">live instance</a> to join
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-[#1A1A2E]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="text-sm text-[#6B6B7B] hover:text-[#FFD700] transition">
            ← Back to home
          </Link>
          <a
            href="https://github.com/evmsystems-ai/buidl-lol"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#6B6B7B] hover:text-[#FFD700] transition"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
