"use client";

import Link from "next/link";

export default function OrganizerPage() {
  return (
    <div className="min-h-screen bg-[#0F0F17]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F17]/80 backdrop-blur-md border-b border-[#1A1A2E]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl">🏗️</span>
            <span className="text-[#F5F5F5]">buidl.lol</span>
          </Link>
          <Link href="/builder" className="text-sm text-[#A0A0B0] hover:text-[#FFD700] transition">
            I'm a Builder →
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-[#1A1A2E] border border-[#2D2D3A] text-sm text-[#A0A0B0]">
              For Organizers
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Launch innovation programs
              <br />
              <span className="gradient-gold">without the overhead</span>
            </h1>
            <p className="text-lg text-[#A0A0B0] max-w-xl mx-auto">
              Run hackathons, bounty programs, and challenges with AI agent operators.
              Self-host or use our managed white-label service.
            </p>
          </div>

          {/* Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Self-host */}
            <div className="p-6 rounded-xl border border-[#2D2D3A] bg-[#1A1A2E]/50">
              <div className="w-12 h-12 rounded-xl bg-[#2D2D3A] flex items-center justify-center text-2xl mb-4">
                🛠️
              </div>
              <h3 className="text-xl font-semibold text-[#F5F5F5] mb-2">Self-Host</h3>
              <p className="text-sm text-[#A0A0B0] mb-4">
                Clone the repo and deploy on your own infrastructure. Full control, MIT licensed.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                {[
                  "Full platform + 4 agent operators",
                  "Deploy anywhere (Vercel, Railway, AWS)",
                  "Customize UI and agents",
                  "Community support on GitHub",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#00FF88] mt-0.5">✓</span>
                    <span className="text-[#A0A0B0]">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://github.com/evmsystems-ai/buidl-lol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full h-10 rounded-lg btn-outline text-sm"
              >
                View on GitHub
              </a>
            </div>

            {/* Managed */}
            <div className="p-6 rounded-xl border-2 border-[#FFD700] bg-[#1A1A2E]/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-[#FFD700] text-[#0F0F17] text-xs font-medium rounded-bl-lg">
                Recommended
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center text-2xl mb-4">
                ☁️
              </div>
              <h3 className="text-xl font-semibold text-[#F5F5F5] mb-2">Managed White-Label</h3>
              <p className="text-sm text-[#A0A0B0] mb-4">
                We deploy and manage the platform for you. Custom branding, dedicated support.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                {[
                  "Fully managed infrastructure",
                  "Custom domain + branding",
                  "Dedicated account manager",
                  "Enterprise SLAs + support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#00FF88] mt-0.5">✓</span>
                    <span className="text-[#A0A0B0]">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:matt@evmsystems.ai?subject=buidl.lol Managed Hosting"
                className="inline-flex items-center justify-center w-full h-10 rounded-lg btn-gold text-sm"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Use cases */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-[#F5F5F5] mb-6 text-center">Built for</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { emoji: "🏛️", label: "Protocols" },
                { emoji: "🏢", label: "Enterprises" },
                { emoji: "🎓", label: "Universities" },
                { emoji: "🌐", label: "Communities" },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 rounded-xl bg-[#1A1A2E] border border-[#2D2D3A]">
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <div className="text-sm text-[#A0A0B0]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick deploy */}
          <div className="bg-[#0A0A12] border border-[#2D2D3A] rounded-xl p-6">
            <h3 className="font-semibold text-[#F5F5F5] mb-2">Quick Deploy</h3>
            <p className="text-sm text-[#6B6B7B] mb-4">Get running in under 5 minutes:</p>
            <div className="bg-[#0F0F17] rounded-lg p-4 border border-[#2D2D3A] terminal-text text-sm overflow-x-auto">
              <div className="text-[#6B6B7B]"># Clone and deploy</div>
              <div className="text-[#F5F5F5]">git clone https://github.com/evmsystems-ai/buidl-lol.git</div>
              <div className="text-[#F5F5F5]">cd buidl-lol</div>
              <div className="text-[#00FF88]">npm install && npm run deploy</div>
            </div>
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
