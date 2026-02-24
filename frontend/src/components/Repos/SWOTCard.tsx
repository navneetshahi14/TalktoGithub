"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";

export interface SWOTCardProps {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  loading?: boolean;
}

const SWOTCard: React.FC<SWOTCardProps> = ({
  strengths = [],
  weaknesses = [],
  opportunities = [],
  threats = [],
  loading = false,
}) => {
  const Section = ({
    title,
    items,
    icon,
    color,
  }: {
    title: string;
    items: string[];
    icon: React.ReactNode;
    color: string;
  }) => (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>

      <ul className="space-y-1 text-xs text-slate-400">
        {items.map((item, index) => (
          <li key={index} className="leading-relaxed">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );

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
          <Icons.Brain size={18} />
          SWOT Analysis
        </h2>

        <button className="text-sm text-cyan-400 hover:text-cyan-300 transition">
          Regenerate
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-slate-800 rounded w-1/2"></div>
              <div className="h-3 bg-slate-800 rounded w-full"></div>
              <div className="h-3 bg-slate-800 rounded w-4/5"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Section
            title="Strengths"
            items={strengths}
            icon={<Icons.CheckCircle size={16} className="text-green-400" />}
            color="green"
          />
          <Section
            title="Weaknesses"
            items={weaknesses}
            icon={<Icons.AlertTriangle size={16} className="text-yellow-400" />}
            color="yellow"
          />
          <Section
            title="Opportunities"
            items={opportunities}
            icon={<Icons.TrendingUp size={16} className="text-cyan-400" />}
            color="cyan"
          />
          <Section
            title="Threats"
            items={threats}
            icon={<Icons.ShieldAlert size={16} className="text-red-400" />}
            color="red"
          />
        </div>
      )}
    </motion.div>
  );
};

export default SWOTCard;