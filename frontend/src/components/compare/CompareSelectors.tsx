"use client";

import { useState } from "react";

const dummyRepos = [
  "facebook/react",
  "vercel/next.js",
  "nestjs/nest",
  "reduxjs/redux",
];

export default function CompareSelectors() {
  const [repoA, setRepoA] = useState(dummyRepos[0]);
  const [repoB, setRepoB] = useState(dummyRepos[1]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <select
        value={repoA}
        onChange={(e) => setRepoA(e.target.value)}
        className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white"
      >
        {dummyRepos.map((repo) => (
          <option key={repo}>{repo}</option>
        ))}
      </select>

      <select
        value={repoB}
        onChange={(e) => setRepoB(e.target.value)}
        className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white"
      >
        {dummyRepos.map((repo) => (
          <option key={repo}>{repo}</option>
        ))}
      </select>
    </div>
  );
}