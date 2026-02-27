interface Props {
  summary: string;
}

export default function ArchitectureSummary({ summary }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-white text-lg font-semibold mb-3">
        Architecture Overview
      </h2>
      <p className="text-slate-400 text-sm leading-relaxed">
        {summary}
      </p>
    </div>
  );
}