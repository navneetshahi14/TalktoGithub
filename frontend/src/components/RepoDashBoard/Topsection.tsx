import React from "react";

const Topsection = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">My Repositories</h1>
          <p className="text-slate-400 text-sm">
            Manage and analyze your GitHub repositories
          </p>
        </div>

        <button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl text-sm transition">
          + Add Repository
        </button>
      </div>
      
    </>
  );
};

export default Topsection;
