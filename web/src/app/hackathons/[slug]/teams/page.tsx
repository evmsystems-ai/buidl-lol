"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { useAccount } from "wagmi";

interface Team {
  id: string;
  name: string;
  description?: string;
  inviteCode: string;
  members: {
    id: string;
    role: string;
    user: {
      id: string;
      displayName?: string;
      ensName?: string;
      avatar?: string;
      skills: string[];
    };
  }[];
  _count: { submissions: number };
}

export default function TeamsPage() {
  const params = useParams();
  const { address, isConnected } = useAccount();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    // Mock data
    setTeams([
      {
        id: "1",
        name: "Web3 Wizards",
        description: "Building the future of autonomous agents",
        inviteCode: "abc123",
        members: [
          { id: "1", role: "LEADER", user: { id: "1", ensName: "alice.eth", skills: ["solidity", "react"] } },
          { id: "2", role: "MEMBER", user: { id: "2", ensName: "bob.eth", skills: ["python", "ml"] } },
          { id: "3", role: "MEMBER", user: { id: "3", displayName: "Charlie", skills: ["design", "ui"] } },
        ],
        _count: { submissions: 1 },
      },
      {
        id: "2",
        name: "Agent Squad",
        description: "AI agents for DeFi",
        inviteCode: "def456",
        members: [
          { id: "4", role: "LEADER", user: { id: "4", ensName: "dave.eth", skills: ["typescript", "langchain"] } },
          { id: "5", role: "MEMBER", user: { id: "5", displayName: "Eve", skills: ["rust", "solana"] } },
        ],
        _count: { submissions: 0 },
      },
    ]);
    setLoading(false);
  }, []);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    // TODO: Call API
    alert(`Team "${newTeamName}" created!`);
    setShowCreateModal(false);
    setNewTeamName("");
  };

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;
    // TODO: Call API
    alert(`Joined team with code: ${inviteCode}`);
    setShowJoinModal(false);
    setInviteCode("");
  };

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
            <h1 className="text-4xl font-bold">Teams</h1>
          </div>
          {isConnected && (
            <div className="flex gap-3">
              <button
                onClick={() => setShowJoinModal(true)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium transition"
              >
                Join with Code
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition"
              >
                + Create Team
              </button>
            </div>
          )}
        </div>

        {/* Looking for Team Banner */}
        {isConnected && (
          <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Looking for teammates?</h3>
                <p className="text-gray-400 text-sm">
                  Let our Team Former agent match you with compatible builders
                </p>
              </div>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium transition">
                Find Teammates
              </button>
            </div>
          </div>
        )}

        {/* Teams Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading teams...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className="rounded-2xl bg-gray-900 border border-gray-800 p-6 hover:border-gray-700 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold">{team.name}</h3>
                  <span className="text-sm text-gray-400">
                    {team.members.length}/4
                  </span>
                </div>
                {team.description && (
                  <p className="text-gray-400 text-sm mb-4">{team.description}</p>
                )}

                {/* Members */}
                <div className="space-y-2 mb-4">
                  {team.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs">
                          {(member.user.ensName || member.user.displayName || "?")[0]}
                        </div>
                        <span>
                          {member.user.ensName || member.user.displayName}
                        </span>
                        {member.role === "LEADER" && (
                          <span className="text-yellow-500 text-xs">👑</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {Array.from(
                    new Set(team.members.flatMap((m) => m.user.skills))
                  )
                    .slice(0, 5)
                    .map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-400"
                      >
                        {skill}
                      </span>
                    ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {team._count.submissions > 0
                      ? `${team._count.submissions} submission`
                      : "No submissions yet"}
                  </span>
                  {team.members.length < 4 && (
                    <button className="text-purple-400 hover:text-purple-300">
                      Request to Join
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Team Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Create Team</h2>
              <form onSubmit={handleCreateTeam}>
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="Team name"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none mb-4"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Join Team Modal */}
        {showJoinModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Join Team</h2>
              <form onSubmit={handleJoinTeam}>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="Enter invite code"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none mb-4"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowJoinModal(false)}
                    className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium"
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
