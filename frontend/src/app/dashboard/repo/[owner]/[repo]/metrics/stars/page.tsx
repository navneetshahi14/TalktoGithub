"use client";

import MetricsOverview from "@/components/metrics/MetricsOverview";
import MetricsSkeleton from "@/components/metrics/MetricsSkeleton";
import StarsForksCharts from "@/components/metrics/StarsForksCharts";
import { useEffect, useState } from "react";

export default function StarsPage() {
  const dummyMetrics = [
    {
      title: "Total Stars",
      value: 5230,
      trend: "+4.2%",
      subtitle: "Last 30 days",
      icon: "Star",
    },
    {
      title: "Total Forks",
      value: 870,
      trend: "+1.1%",
      subtitle: "Community growth",
      icon: "GitFork",
    },
    {
      title: "Star/Fork Ratio",
      value: "6.0",
      subtitle: "Popularity ratio",
      icon: "TrendingUp",
    },
  ];

  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // simulate API delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <MetricsSkeleton arraySize={3  } />;
  }

  return (
    <div className="bg-gray-900 rounded p-6 space-y-6 flex-1 transition-all duration-300 m-2 flex overflow-y-auto flex-col h-[calc(100vh-8vh)]">
      <MetricsOverview data={dummyMetrics} />
      <StarsForksCharts />
    </div>
  );
}
