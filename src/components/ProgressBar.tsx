export default function ProgressBar({ value }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
      <div
        className="bg-blue-500 h-3 rounded-full transition-all"
        style={{ width: `${value}%` }}
      />
      <span className="text-xs text-gray-600 ml-1">{Math.round(value)}%</span>
    </div>
  );
} 