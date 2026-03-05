import React from "react";

interface MetricSkeletonProps {
  arraySize: number;
}

const MetricsSkeleton: React.FC<MetricSkeletonProps> = ({ arraySize }) => {
  return (
    <div className=" bg-gray-900 rounded p-6 space-y-6 flex-1 transition-all duration-300 m-2  overflow-y-auto  h-[calc(100vh-8vh)] flex flex-col gap-8 shimmer">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {[...Array(arraySize)].map((_, i) => (
          <div
            key={i}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
          >
            <div className="h-4 w-24 bg-slate-800 rounded mb-3" />
            <div className="h-8 w-20 bg-slate-800 rounded mb-2" />
            <div className="h-3 w-32 bg-slate-800 rounded" />
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl h-87.5 flex items-center justify-center">
        <div className="w-2/3 space-y-4">
          <div className="h-4 bg-slate-800 rounded w-1/3 mx-auto" />
          <div className="h-40 bg-slate-800 rounded" />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl h-87.5" />
    </div>
  );
};

export default MetricsSkeleton;
