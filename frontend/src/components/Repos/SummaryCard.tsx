"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

export interface SummaryCardProps {
  summary: string;
  technologies?: string[];
  architecture?: string;
  lastUpdated?: string;
  loading?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  summary,
  technologies = [],
  architecture,
  lastUpdated,
  loading = false,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Icons.FileText size={18} />
          AI Summary
        </h2>

        <button className="text-sm text-cyan-400 hover:text-cyan-300 transition">
          Regenerate
        </button>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-slate-800 rounded w-3/4"></div>
          <div className="h-4 bg-slate-800 rounded w-5/6"></div>
          <div className="h-4 bg-slate-800 rounded w-2/3"></div>
        </div>
      ) : (
        <>
          {/* Summary Text */}
          <p className="text-sm text-slate-300 leading-relaxed">
            {summary}
          </p>

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-xl"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Architecture */}
          {architecture && (
            <div className="mt-4 text-xs text-slate-400">
              🏗 Architecture:{" "}
              <span className="text-slate-300 font-medium">
                {architecture}
              </span>
            </div>
          )}

          {/* Last Updated */}
          {lastUpdated && (
            <div className="mt-4 text-xs text-slate-500">
              Last generated {lastUpdated}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default SummaryCard;