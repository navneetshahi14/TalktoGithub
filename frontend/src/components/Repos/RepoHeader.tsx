"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RepoHeaderProps {
  name: string; // facebook/react
  description?: string;
  stars?: string;
  forks?: string;
  language?: string;
  visibility?: "public" | "private";
  healthScore?: number; // 0–100
}

const RepoHeader: React.FC<RepoHeaderProps> = ({
  name,
  description,
  stars,
  forks,
  language,
  visibility = "public",
  healthScore,
}) => {
  const visibilityStyles =
    visibility === "public"
      ? "bg-green-500/20 text-green-400"
      : "bg-red-500/20 text-red-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
    >
      {/* Top Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{name}</h1>

            <span
              className={cn(
                "text-xs px-2 py-1 rounded-xl font-medium",
                visibilityStyles
              )}
            >
              {visibility}
            </span>
          </div>

          {description && (
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl text-sm font-medium transition">
            Re-analyze
          </button>

          <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-sm transition">
            Delete
          </button>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mt-6">
        {stars && (
          <span className="flex items-center gap-2">
            <Icons.Star size={16} /> {stars} Stars
          </span>
        )}

        {forks && (
          <span className="flex items-center gap-2">
            <Icons.GitFork size={16} /> {forks} Forks
          </span>
        )}

        {language && (
          <span className="flex items-center gap-2">
            <Icons.Code size={16} /> {language}
          </span>
        )}

        {healthScore !== undefined && (
          <span
            className={cn(
              "px-3 py-1 rounded-xl text-xs font-semibold",
              healthScore >= 75
                ? "bg-green-500/20 text-green-400"
                : healthScore >= 50
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
            )}
          >
            Health Score: {healthScore}%
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default RepoHeader;