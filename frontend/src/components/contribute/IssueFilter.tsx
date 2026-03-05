"use client";

import { useState, useMemo } from "react";

type Issue = {
  id: number;
  title: string;
  label: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "Open" | "Closed";
};

const dummyIssues: Issue[] = [
  {
    id: 1,
    title: "Fix navbar responsiveness",
    label: "good first issue",
    difficulty: "Easy",
    status: "Open",
  },
  {
    id: 2,
    title: "Optimize API performance",
    label: "enhancement",
    difficulty: "Medium",
    status: "Open",
  },
  {
    id: 3,
    title: "Refactor authentication module",
    label: "bug",
    difficulty: "Hard",
    status: "Closed",
  },
];

export default function IssueFilter() {
  const [filter, setFilter] = useState("all");

  const filteredIssues = useMemo(() => {
    if (filter === "all") return dummyIssues;
    return dummyIssues.filter((issue) => issue.label === filter);
  }, [filter]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-semibold">
          Contribution Issues
        </h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-sm"
        >
          <option value="all">All</option>
          <option value="good first issue">Good First Issue</option>
          <option value="bug">Bug</option>
          <option value="enhancement">Enhancement</option>
        </select>
      </div>

      <div className="space-y-3">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="bg-slate-800 rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="text-white text-sm">
                {issue.title}
              </p>
              <p className="text-xs text-slate-400">
                {issue.label} • {issue.difficulty}
              </p>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded-lg ${
                issue.status === "Open"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {issue.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}