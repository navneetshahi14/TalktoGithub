"use client";

import MetricsOverview from "@/components/metrics/MetricsOverview";
import dynamic from "next/dynamic";
const AnalyticsCharts = dynamic(
  ()=>import("@/components/metrics/AnalyticsCharts"),{
    loading:()=>null,
    ssr:false
  }
)
// import AnalyticsCharts from "@/components/metrics/AnalyticsCharts";
import { useEffect, useState } from "react";
import MetricsSkeleton from "@/components/metrics/MetricsSkeleton";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState<Boolean>(true);
  const dummyMetrics = [
    {
      title: "Total Stars",
      value: 5230,
      trend: "+4.2%",
      subtitle: "Last 30 days",
      icon: "Star",
    },
    {
      title: "Forks",
      value: 870,
      trend: "+1.1%",
      subtitle: "Community engagement",
      icon: "GitFork",
    },
    {
      title: "Commits (30d)",
      value: 112,
      trend: "+12%",
      subtitle: "Development activity",
      icon: "GitCommit",
    },
    {
      title: "Contributors",
      value: 28,
      trend: "+2",
      subtitle: "Active developers",
      icon: "Users",
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
    <div className="bg-gray-900 rounded p-6 space-y-6 flex-1 transition-all duration-300 m-2 flex overflow-y-auto flex-col h-[calc(100vh-8vh)] ">
      <MetricsOverview data={dummyMetrics} />
      <AnalyticsCharts />
    </div>
  );
}
