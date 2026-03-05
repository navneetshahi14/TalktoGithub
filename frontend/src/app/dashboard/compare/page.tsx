"use client";

import CompareSelectors from "@/components/compare/CompareSelectors";
import CompareOverview from "@/components/compare/CompareOverview";
import CompareCharts from "@/components/compare/CompareCharts";
import LanguageComparison from "@/components/compare/LanguageComparison";

export default function ComparePage() {
  return (
    <div className="bg-gray-900 rounded p-6 space-y-6 flex-1 transition-all duration-300 m-2 flex overflow-y-auto flex-col h-[calc(100vh-8vh)]">
      <CompareSelectors />
      <CompareOverview />
      <CompareCharts />
      <LanguageComparison />
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-white font-semibold mb-3">AI Comparison Insight</h2>

        <p className="text-slate-400 text-sm">
          React has significantly higher community adoption with strong
          long-term stability, while Next.js shows rapid growth momentum and
          faster innovation velocity.
        </p>
      </div>
      
    </div>
  );
}
