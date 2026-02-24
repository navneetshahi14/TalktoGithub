import React from "react";

const DashRecent = () => {
  return (
    <>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">
        <h2 className="text-lg font-semibold text-white mb-4">
          Recent Repositories
        </h2>

        <div className="space-y-3">
          {["reactjs/react", "vercel/next.js", "facebook/react"].map((repo) => (
            <div
              key={repo}
              className="flex items-center justify-between bg-slate-800 px-4 py-3 rounded-lg hover:bg-slate-700 transition"
            >
              <span className="text-slate-300">{repo}</span>
              <span className="text-xs text-slate-500">2 hrs ago</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">
        <h2 className="text-lg font-semibold text-white mb-4">AI Activity</h2>

        <div className="space-y-3 text-sm text-slate-400">
          <p>SWOT generated for reactjs/react</p>
          <p>Cached result served for next.js</p>
          <p>Analytics refreshed for facebook/react</p>
        </div>
      </div>
    </>
  );
};

export default DashRecent;
