"use client";

import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

export interface MetricItem {
  title: string;
  value: number | string;
  subtitle?: string;
  trend?: string;
  icon?: string;
}

interface MetricsOverviewProps {
  data: MetricItem[];
}

export default function MetricsOverview({
  data,
}: MetricsOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {data.map((metric, index) => {
        const IconComponent =
          metric.icon && metric.icon in Icons
            ? (Icons[
                metric.icon as keyof typeof Icons
              ] as LucideIcon)
            : Icons.BarChart3;

        const isNegative =
          metric.trend?.startsWith("-");

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-slate-900 drop-shadow-lg drop-shadow-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/40 transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm">
                {metric.title}
              </p>

              <IconComponent
                size={18}
                className="text-slate-500"
              />
            </div>

            <div className="mt-3 flex items-end justify-between">
              <h2 className="text-white text-2xl font-semibold">
                {metric.value}
              </h2>

              {metric.trend && (
                <span
                  className={`text-sm ${
                    isNegative
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  {metric.trend}
                </span>
              )}
            </div>

            {metric.subtitle && (
              <p className="text-xs text-slate-500 mt-2">
                {metric.subtitle}
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}