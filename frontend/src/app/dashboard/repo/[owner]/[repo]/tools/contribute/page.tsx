"use client";

import ContributeSummary from "@/components/contribute/ContributeSummary";
import ContributeSteps from "@/components/contribute/ContributeSteps";
import ContributeInsight from "@/components/contribute/ContributeInsight";
import IssueFilter from "@/components/contribute/IssueFilter";

export default function ContributePage() {
  return (
    <div className="bg-gray-900 rounded p-6 space-y-6 flex-1 transition-all duration-300 m-2 flex overflow-y-auto flex-col h-[calc(100vh-8vh)]">
      <ContributeSummary />
      <ContributeSteps />
      <IssueFilter />
      <ContributeInsight />
    </div>
  );
}
