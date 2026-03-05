export default function ContributeInsight() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-white font-semibold mb-3">
        AI Contribution Insight
      </h2>

      <p className="text-slate-400 text-sm leading-relaxed">
        The most active modules in this repository are located in the 
        <span className="text-white font-medium"> /src/services </span>
        directory. New contributors may start by reviewing open issues labeled 
        <span className="text-white font-medium"> "good first issue" </span>.
        Pull requests typically merge within 3-4 days.
      </p>
    </div>
  );
}