"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const starGrowth = [
  { month: "Jan", stars: 4200 },
  { month: "Feb", stars: 4500 },
  { month: "Mar", stars: 4700 },
  { month: "Apr", stars: 4900 },
  { month: "May", stars: 5230 },
];

const commitActivity = [
  { week: "W1", commits: 25 },
  { week: "W2", commits: 32 },
  { week: "W3", commits: 18 },
  { week: "W4", commits: 37 },
];

const languageData = [
  { name: "TypeScript", value: 65 },
  { name: "JavaScript", value: 20 },
  { name: "CSS", value: 10 },
  { name: "Other", value: 5 },
];

const COLORS = ["#22d3ee", "#a78bfa", "#f59e0b", "#ef4444"];

export default function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-auto">
      {/* Stars Growth */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-87.5">
        <h2 className="text-white mb-4 font-semibold">Stars Growth</h2>
        <ResponsiveContainer width="100%" height="90%" debounce={200}>
          <LineChart data={starGrowth}>
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="stars"
              stroke="#22d3ee"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Commit Activity */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-87.5">
        <h2 className="text-white mb-4 font-semibold">
          Weekly Commit Activity
        </h2>
        <ResponsiveContainer width="100%" height="90%" debounce={200}>
          <BarChart data={commitActivity}>
            <XAxis dataKey="week" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="commits" fill="#a78bfa" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Language Distribution */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-87.5 xl:col-span-2">
        <h2 className="text-white mb-4 font-semibold">Language Distribution</h2>
        <ResponsiveContainer width="100%" height="90%" debounce={200}>
          <PieChart>
            <Pie
              data={languageData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {languageData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
