"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { useAccount } from "wagmi";

export default function SubmitProjectPage() {
  const params = useParams();
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    githubUrl: "",
    demoUrl: "",
    videoUrl: "",
    deployedUrl: "",
    techStack: "",
    trackId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    if (!isConnected) return;

    setLoading(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          hackathonId: params.slug, // TODO: Get real hackathon ID
          submitterId: address,
          techStack: formData.techStack.split(",").map((s) => s.trim()).filter(Boolean),
          submit: !isDraft,
        }),
      });

      if (res.ok) {
        const submission = await res.json();
        router.push(`/hackathons/${params.slug}/submissions/${submission.id}`);
      } else {
        const error = await res.json();
        alert(error.error || "Failed to submit");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Connect Wallet</h1>
          <p className="text-gray-400">
            Please connect your wallet to submit a project
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <main className="container mx-auto px-6 py-12 max-w-2xl">
        <h1 className="text-4xl font-bold mb-2">Submit Project</h1>
        <p className="text-gray-400 mb-8">
          Submit your hackathon project for judging
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Info */}
          <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 space-y-4">
            <h2 className="text-lg font-semibold">Project Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
                placeholder="My Awesome Agent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                maxLength={100}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
                placeholder="An AI agent that does X"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none resize-none"
                placeholder="Describe what your project does, how it works, and what problem it solves..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Tech Stack
              </label>
              <input
                type="text"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
                placeholder="Next.js, OpenAI, LangChain (comma separated)"
              />
            </div>
          </div>

          {/* Links */}
          <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 space-y-4">
            <h2 className="text-lg font-semibold">Links</h2>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                GitHub Repository *
              </label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Demo Video
              </label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Live Demo URL
              </label>
              <input
                type="url"
                name="deployedUrl"
                value={formData.deployedUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
                placeholder="https://myproject.vercel.app"
              />
            </div>
          </div>

          {/* Track Selection */}
          <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6">
            <h2 className="text-lg font-semibold mb-4">Track (Optional)</h2>
            <select
              name="trackId"
              value={formData.trackId}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
            >
              <option value="">General submission</option>
              <option value="productivity">Productivity Agents</option>
              <option value="creative">Creative Agents</option>
              <option value="defi">DeFi Agents</option>
            </select>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={loading}
              className="flex-1 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Project"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
