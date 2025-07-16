import ProgressBar from './ProgressBar';

function DifficultyBadge({ level }) {
  const colors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800"
  };
  return <span className={`px-2 py-0.5 rounded text-xs font-semibold ml-2 ${colors[level]}`}>{level}</span>;
}

export default function WeekCard({ week, onProblemComplete }) {
  return (
    <div className="week-card bg-white rounded-xl shadow p-4">
      <h3 className="font-bold mb-2">
        Week {week.number} ({week.completedProblems?.length || 0}/{week.problems.length})
      </h3>
      <ProgressBar value={((week.completedProblems?.length || 0) / week.problems.length) * 100} />
      <ul className="mt-2 space-y-2">
        {week.problems.map((problem) => (
          <li key={problem.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={week.completedProblems?.includes(problem.id)}
              onChange={() => onProblemComplete(problem.id)}
            />
            <span>{problem.title}</span>
            <DifficultyBadge level={problem.difficulty} />
            <a href={problem.platformUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Link</a>
          </li>
        ))}
      </ul>
    </div>
  );
} 