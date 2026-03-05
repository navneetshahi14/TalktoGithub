"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { metric: "Stars", A: 215000, B: 120000 },
  { metric: "Forks", A: 45000, B: 25000 },
  { metric: "Issues", A: 1200, B: 800 },
];

export default function CompareCharts() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-100">
      <h2 className="text-white mb-4 font-semibold">
        Repository Comparison
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="metric" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="A" fill="#22d3ee" />
          <Bar dataKey="B" fill="#a78bfa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}