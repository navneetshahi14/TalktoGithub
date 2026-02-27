export default function ArchitectureSkeleton() {
  return (
    <div className="bg-gray-900 rounded p-6 space-y-6 flex-1 transition-all duration-300 m-2 flex flex-col h-[calc(100vh-8vh)] shimmer">
      
      {/* Summary Skeleton */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="h-6 w-48 bg-slate-800 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-slate-800 rounded w-full" />
          <div className="h-4 bg-slate-800 rounded w-5/6" />
          <div className="h-4 bg-slate-800 rounded w-4/6" />
        </div>
      </div>

      {/* Graph Skeleton */}
      <div className="h-[70vh] bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center">
        <div className="space-y-4 w-full max-w-3xl">
          <div className="h-16 bg-slate-800 rounded-xl w-1/3 mx-auto" />
          <div className="h-16 bg-slate-800 rounded-xl w-1/2 mx-auto" />
          <div className="h-16 bg-slate-800 rounded-xl w-1/4 mx-auto" />
        </div>
      </div>
    </div>
  );
}