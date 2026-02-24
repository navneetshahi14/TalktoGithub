"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RepoCardProps {
  id: number | string;
  name: string;
  description?: string;
  stars?: string;
  forks?: string;
  language?: string;
  status?: "Analyzed" | "Pending" | "Failed";
  lastAnalyzed?: string;
}

const RepoCard: React.FC<RepoCardProps> = ({
  id,
  name,
  description,
  stars,
  forks,
  language,
  status = "Analyzed",
  lastAnalyzed,
}) => {
  const statusStyles = {
    Analyzed: "bg-green-500/20 text-green-400",
    Pending: "bg-yellow-500/20 text-yellow-400",
    Failed: "bg-red-500/20 text-red-400",
  };

  const StatusIcon: LucideIcon =
    status === "Analyzed"
      ? Icons.CheckCircle
      : status === "Pending"
        ? Icons.Loader
        : Icons.XCircle;

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/30 transition-all shadow-sm"
    >
      {/* Top Row */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-white truncate">{name}</h3>

          {description && (
            <p className="text-sm text-slate-400 mt-1 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Status Badge */}
        <div
          className={cn(
            "flex items-center gap-1 text-xs px-2 py-1 rounded-xl",
            statusStyles[status],
          )}
        >
          <StatusIcon size={14} />
          {status}
        </div>
      </div>

      {/* Repo Meta */}
      <div className="flex gap-4 text-xs text-slate-400 mt-4">
        {stars && (
          <span className="flex items-center gap-1">
            <Icons.Star size={14} /> {stars}
          </span>
        )}
        {forks && (
          <span className="flex items-center gap-1">
            <Icons.GitFork size={14} /> {forks}
          </span>
        )}
        {language && (
          <span className="flex items-center gap-1">
            <Icons.Code size={14} /> {language}
          </span>
        )}
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center mt-5">
        {lastAnalyzed ? (
          <span className="text-xs text-slate-500">
            Last analyzed {lastAnalyzed}
          </span>
        ) : (
          <span className="text-xs text-slate-500">Not analyzed yet</span>
        )}

        <Link
          href={`/dashboard/repo/${name}`}
          className="text-sm text-cyan-400 hover:text-cyan-300 transition font-medium"
        >
          Open →
        </Link>
      </div>
    </motion.div>
  );
};

export default RepoCard;
