"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const starGrowth = [
  { month: "Jan", stars: 4200 },
  { month: "Feb", stars: 4500 },
  { month: "Mar", stars: 4700 },
  { month: "Apr", stars: 4900 },
  { month: "May", stars: 5230 },
];

const forkGrowth = [
  { month: "Jan", forks: 720 },
  { month: "Feb", forks: 760 },
  { month: "Mar", forks: 800 },
  { month: "Apr", forks: 840 },
  { month: "May", forks: 870 },
];

export default function StarsForksCharts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Stars Growth */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-87.5">
        <h2 className="text-white mb-4 font-semibold">
          Stars Growth Over Time
        </h2>

        <ResponsiveContainer width="100%" height="90%" debounce={200}>
          <LineChart data={starGrowth}>
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="stars"
              stroke="#facc15"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Fork Growth */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-87.5">
        <h2 className="text-white mb-4 font-semibold">
          Fork Growth Over Time
        </h2>

        <ResponsiveContainer width="100%" height="90%" debounce={200}>
          <LineChart data={forkGrowth}>
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="forks"
              stroke="#a78bfa"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insight Card */}
      <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-3">
          Popularity Insight
        </h2>

        <p className="text-slate-400 text-sm leading-relaxed">
          This repository is gaining approximately <span className="text-white font-medium">120 stars per month</span>,
          indicating steady community growth. The star-to-fork ratio suggests
          strong interest with moderate contribution activity.
        </p>
      </div>
    </div>
  );
}