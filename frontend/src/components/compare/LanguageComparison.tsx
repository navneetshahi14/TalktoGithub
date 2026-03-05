"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const repoALanguages = [
  { name: "TypeScript", value: 60 },
  { name: "JavaScript", value: 25 },
  { name: "CSS", value: 10 },
  { name: "Other", value: 5 },
];

const repoBLanguages = [
  { name: "JavaScript", value: 55 },
  { name: "TypeScript", value: 30 },
  { name: "CSS", value: 10 },
  { name: "Other", value: 5 },
];

const COLORS = ["#22d3ee", "#a78bfa", "#f59e0b", "#ef4444"];

export default function LanguageComparison() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Repo A */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-87.5">
        <h2 className="text-white mb-4 font-semibold">
          Repo A Language Distribution
        </h2>

        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={repoALanguages}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {repoALanguages.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Repo B */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-87.5">
        <h2 className="text-white mb-4 font-semibold">
          Repo B Language Distribution
        </h2>

        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={repoBLanguages}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {repoBLanguages.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Insight */}
      <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-3">
          Language Insight
        </h2>

        <p className="text-slate-400 text-sm">
          Repo A is strongly TypeScript-driven, indicating stricter typing and scalability focus.
          Repo B relies more on JavaScript, potentially favoring rapid development and flexibility.
        </p>
      </div>
    </div>
  );
}