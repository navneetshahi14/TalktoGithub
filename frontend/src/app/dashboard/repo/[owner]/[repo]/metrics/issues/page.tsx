"use client";

import MetricsOverview from "@/components/metrics/MetricsOverview";
import IssuesPRCharts from "@/components/metrics/IssuesPRCharts";
import { useEffect, useState } from "react";
import MetricsSkeleton from "@/components/metrics/MetricsSkeleton";

export default function IssuesPage() {
  const [loading, setLoading] = useState<Boolean>(true);

  const dummyMetrics = [
    {
      title: "Open Issues",
      value: 42,
      trend: "-3.4%",
      subtitle: "Last 30 days",
      icon: "AlertCircle",
    },
    {
      title: "Closed Issues",
      value: 312,
      trend: "+6%",
      subtitle: "Resolved cases",
      icon: "CheckCircle2",
    },
    {
      title: "Open PRs",
      value: 8,
      trend: "+2",
      subtitle: "Awaiting review",
      icon: "GitPullRequest",
    },
    {
      title: "Merged PRs (30d)",
      value: 56,
      trend: "+9%",
      subtitle: "Development velocity",
      icon: "GitMerge",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // simulate API delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <MetricsSkeleton arraySize={4} />;
  }

  return (
    <div className="bg-gray-900 rounded p-6 space-y-6 flex-1 transition-all duration-300 m-2 flex flex-col h-[calc(100vh-8vh)] overflow-y-auto">
      <MetricsOverview data={dummyMetrics} />
      <IssuesPRCharts />
    </div>
  );
}
