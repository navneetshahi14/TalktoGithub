"use client";

import { motion } from "framer-motion";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
    >
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      {children}
    </motion.div>
  );
};

export default ChartCard;
