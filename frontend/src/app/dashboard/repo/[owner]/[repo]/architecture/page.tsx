"use client";

import { useEffect, useState } from "react";
import ArchitectureGraph from "@/components/architecture/ArchitectureGraph";
import ArchitectureSummary from "@/components/architecture/ArchitectureSummary";
import { useParams } from "next/navigation";
import { advancedDummy, dummyArchitectureInsight } from "@/utils/treeData";
import ArchitectureSkeleton from "@/components/architecture/ArchitectureSkeleton";

export default function ArchitecturePage() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      // try {
      //   const res = await fetch(
      //     `/api/architecture?owner=${params.owner}&repo=${params.repo}`
      //   );
      //   const result = await res.json();
      //   setData(result);
      // } catch (err) {
      //   console.error(err);
      // } finally {
      //   setLoading(false);
      // }

      setLoading(true);
      setTimeout(() => {
        setData(advancedDummy);
        setLoading(false);
      }, 5000);
      // setLoading(false);
    };

    fetchInsight();
  }, [params]);

    if (loading) {
    return <ArchitectureSkeleton />;
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-full text-slate-400 text-sm">
        Failed to load architecture insight.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded p-6 space-y-6 flex-1 transition-all duration-300 m-2 min-h-[92.5vh] ">
      <ArchitectureSummary summary={data.summary} />
      <ArchitectureGraph layers={data.layers} connections={data.connections} />
    </div>
  );
}
