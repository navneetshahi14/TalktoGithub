export default function ContributeSteps() {
  const steps = [
    {
      title: "1. Clone the Repository",
      content: "git clone https://github.com/owner/repo.git",
    },
    {
      title: "2. Install Dependencies",
      content: "npm install",
    },
    {
      title: "3. Create a Feature Branch",
      content: "git checkout -b feature/your-feature-name",
    },
    {
      title: "4. Submit Pull Request",
      content: "Push your branch and open a PR on GitHub.",
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-white font-semibold mb-4">
        Getting Started
      </h2>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-xl p-4"
          >
            <h3 className="text-white font-medium mb-1">
              {step.title}
            </h3>
            <code className="text-cyan-400 text-sm">
              {step.content}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}