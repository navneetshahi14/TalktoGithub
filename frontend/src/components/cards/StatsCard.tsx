"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: number; // percentage (+5 / -3)
  subtitle?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  subtitle,
}) => {
  const IconComponent =
    icon in Icons
      ? (Icons[icon as keyof typeof Icons] as LucideIcon)
      : Icons.Activity;

  const isPositive = trend && trend > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md hover:border-cyan-500/30 transition-all"
    >
      {/* Top Row */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-400">{title}</p>

        <div className="p-2 bg-slate-800 rounded-xl">
          <IconComponent size={18} className="text-cyan-400" />
        </div>
      </div>

      {/* Value */}
      <div className="flex items-end gap-3">
        <h2 className="text-3xl font-bold text-white">{value}</h2>

        {trend !== undefined && (
          <span
            className={cn(
              "text-sm font-medium",
              isPositive ? "text-green-400" : "text-red-400"
            )}
          >
            {isPositive ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xs text-slate-500 mt-2">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default StatsCard;