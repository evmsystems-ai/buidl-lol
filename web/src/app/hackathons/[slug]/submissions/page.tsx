"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";

interface Submission {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  githubUrl: string;
  demoUrl?: string;
  videoUrl?: string;
  deployedUrl?: string;
  techStack: string[];
  status: string;
  submittedAt?: string;
  team?: {
    id: string;
    name: string;
  };
  submitter: {
    displayName?: string;
    ensName?: string;
    avatar?: string;
  };
  track?: {
    name: string;
  };
}

export default function SubmissionsPage() {
  const params = useParams();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Mock data
    setSubmissions([
      {
        id: "1",
        name: "AutoTrader AI",
        tagline: "Autonomous DeFi trading agent with risk management",
        description: "An AI agent that executes trades based on market conditions...",
        githubUrl: "https://github.com/example/autotrader-ai",
        deployedUrl: "https://autotrader.ai",
        videoUrl: "https://youtube.com/watch?v=demo",
        techStack: ["TypeScript", "LangChain", "OpenAI", "Uniswap"],
        status: "SUBMITTED",
        submittedAt: "2026-03-20T14:30:00Z",
        team: { id: "1", name: "Web3 Wizards" },
        submitter: { ensName: "alice.eth" },
        track: { name: "DeFi Agents" },
      },
      {
        id: "2",
        name: "CodeReview Bot",
        tagline: "AI-powered code review for your PRs",
        description: "Automatically reviews pull requests and suggests improvements...",
        githubUrl: "https://github.com/example/codereview-bot",
        techStack: ["Python", "Anthropic", "GitHub API"],
        status: "SUBMITTED",
        submittedAt: "2026-03-20T12:00:00Z",
        submitter: { ensName: "bob.eth" },
        track: { name: "Productivity Agents" },
      },
      {
        id: "3",
        name: "ArtGen",
        tagline: "Create stunning art with natural language",
        description: "Describe what you want and watch the AI create it...",
        githubUrl: "https://github.com/example/artgen",
        deployedUrl: "https://artgen.app",
        techStack: ["Next.js", "Stable Diffusion", "DALL-E"],
        status: "SUBMITTED",
        submittedAt: "2026-03-19T18:00:00Z",
        team: { id: "2", name: "Agent Squad" },
        submitter: { displayName: "Charlie" },
        track: { name: "Creative Agents" },
      },
    ]);
    setLoading(false);
  }, []);

  const tracks = ["all", ...new Set(submissions.map((s) => s.track?.name).filter((t): t is string => Boolean(t)))];
  const filteredSubmissions = submissions.filter(
    (s) => filter === "all" || s.track?.name === filter
  );

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href={`/hackathons/${params.slug}`}
              className="text-gray-400 hover:text-white text-sm mb-2 inline-block"
            >
              ← Back to hackathon
            </Link>
            <h1 className="text-4xl font-bold">Submissions</h1>
            <p className="text-gray-400 mt-1">
              {submissions.length} projects submitted
            </p>
          </div>
          <Link
            href={`/hackathons/${params.slug}/submit`}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition"
          >
            + Submit Project
          </Link>
        </div>

        {/* Track Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tracks.map((track) => (
            <button
              key={track}
              onClick={() => setFilter(track)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === track
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {track === "all" ? "All Tracks" : track}
            </button>
          ))}
        </div>

        {/* Submissions Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubmissions.map((submission) => (
              <Link
                key={submission.id}
                href={`/hackathons/${params.slug}/submissions/${submission.id}`}
                className="group rounded-2xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition overflow-hidden"
              >
                {/* Header */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold group-hover:text-purple-400 transition">
                        {submission.name}
                      </h3>
                      {submission.tagline && (
                        <p className="text-gray-400 text-sm mt-1">
                          {submission.tagline}
                        </p>
                      )}
                    </div>
                    {submission.track && (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                        {submission.track.name}
                      </span>
                    )}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {submission.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {submission.techStack.length > 4 && (
                      <span className="px-2 py-0.5 text-xs text-gray-500">
                        +{submission.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mb-4 text-sm">
                    <a
                      href={submission.githubUrl}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-white"
                    >
                      GitHub →
                    </a>
                    {submission.deployedUrl && (
                      <a
                        href={submission.deployedUrl}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 hover:text-white"
                      >
                        Demo →
                      </a>
                    )}
                    {submission.videoUrl && (
                      <a
                        href={submission.videoUrl}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 hover:text-white"
                      >
                        Video →
                      </a>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-xs">
                        {(submission.team?.name || submission.submitter.ensName || "?")[0]}
                      </div>
                      <span>
                        {submission.team?.name ||
                          submission.submitter.ensName ||
                          submission.submitter.displayName}
                      </span>
                    </div>
                    {submission.submittedAt && (
                      <span>
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredSubmissions.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">No submissions yet</p>
            <Link
              href={`/hackathons/${params.slug}/submit`}
              className="text-purple-400 hover:text-purple-300"
            >
              Be the first to submit →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
