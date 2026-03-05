"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const issueData = [
  { month: "Jan", open: 60, closed: 40 },
  { month: "Feb", open: 55, closed: 65 },
  { month: "Mar", open: 48, closed: 72 },
  { month: "Apr", open: 45, closed: 80 },
  { month: "May", open: 42, closed: 90 },
];

const prData = [
  { month: "Jan", open: 12, merged: 30 },
  { month: "Feb", open: 10, merged: 35 },
  { month: "Mar", open: 9, merged: 42 },
  { month: "Apr", open: 8, merged: 48 },
  { month: "May", open: 8, merged: 56 },
];

const mergeTimeTrend = [
  { month: "Jan", avgDays: 5 },
  { month: "Feb", avgDays: 4.2 },
  { month: "Mar", avgDays: 3.8 },
  { month: "Apr", avgDays: 4.5 },
  { month: "May", avgDays: 3.2 },
];

export default function IssuesPRCharts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Issues Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-87.5">
        <h2 className="text-white mb-4 font-semibold">
          Issues Activity
        </h2>

        <ResponsiveContainer width="100%" height="90%" debounce={200}>
          <BarChart data={issueData}>
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="open" fill="#ef4444" />
            <Bar dataKey="closed" fill="#22d3ee" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PR Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-87.5">
        <h2 className="text-white mb-4 font-semibold">
          Pull Request Activity
        </h2>

        <ResponsiveContainer width="100%" height="90%" debounce={200}>
          <BarChart data={prData}>
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="open" fill="#f59e0b" />
            <Bar dataKey="merged" fill="#a78bfa" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Merge Time Trend */}
      <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 h-87.5">
        <h2 className="text-white mb-4 font-semibold">
          Average PR Merge Time (Days)
        </h2>

        <ResponsiveContainer width="100%" height="90%" debounce={200}>
          <LineChart data={mergeTimeTrend}>
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="avgDays"
              stroke="#22d3ee"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insight */}
      <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-3">
          Maintenance Insight
        </h2>

        <p className="text-slate-400 text-sm leading-relaxed">
          The repository shows strong issue resolution activity with
          decreasing open issues over time. PR merge time has improved
          to an average of <span className="text-white font-medium">3.2 days</span>,
          indicating efficient code review and active maintenance.
        </p>
      </div>
    </div>
  );
}