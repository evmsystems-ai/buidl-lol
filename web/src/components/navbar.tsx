"use client";

import Link from "next/link";
import { ConnectButton } from "./connect-button";

export function Navbar() {
  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          🏗️ buidl.lol
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/hackathons" className="text-gray-400 hover:text-white transition">
            Hackathons
          </Link>
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition">
            Dashboard
          </Link>
          <Link href="/agents" className="text-gray-400 hover:text-white transition">
            Agents
          </Link>
          <a
            href="https://github.com/evmsystems-ai/buidl-lol"
            target="_blank"
            className="text-gray-400 hover:text-white transition"
          >
            GitHub
          </a>
          <ConnectButton />
        </nav>
      </div>
    </header>
  );
}
