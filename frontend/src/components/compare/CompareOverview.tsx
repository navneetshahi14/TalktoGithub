"use client";

const repoA = {
  name: "facebook/react",
  stars: 215000,
  forks: 45000,
  issues: 1200,
};

const repoB = {
  name: "vercel/next.js",
  stars: 120000,
  forks: 25000,
  issues: 800,
};

export default function CompareOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ComparisonCard label="Stars" a={repoA.stars} b={repoB.stars} />
      <ComparisonCard label="Forks" a={repoA.forks} b={repoB.forks} />
      <ComparisonCard label="Open Issues" a={repoA.issues} b={repoB.issues} />
    </div>
  );
}

function ComparisonCard({
  label,
  a,
  b,
}: {
  label: string;
  a: number;
  b: number;
}) {
  const winner = a > b ? "A" : "B";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <p className="text-slate-400 text-sm mb-2">{label}</p>

      <div className="flex justify-between items-center">
        <span className="text-white font-semibold">
          {a}
        </span>
        <span className="text-slate-500">vs</span>
        <span className="text-white font-semibold">
          {b}
        </span>
      </div>

      <p className="text-xs mt-3 text-cyan-400">
        Repo {winner} leads
      </p>
    </div>
  );
}