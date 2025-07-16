import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

export default function PlanConfigurator({ onGenerate }: { onGenerate: (prefs: any) => void }) {
  const [weeks, setWeeks] = useState(8);
  const [hoursPerWeek, setHours] = useState(15);
  const [selectedDifficulty, setDifficulty] = useState<Array<typeof DIFFICULTIES[number]>>(["Easy", "Medium"]);

  function toggleDifficulty(diff: typeof DIFFICULTIES[number]) {
    setDifficulty((prev) =>
      prev.includes(diff) ? prev.filter((d) => d !== diff) : [...prev, diff]
    );
  }

  return (
    <div className="space-y-6 max-w-md mx-auto p-4 bg-white rounded-xl shadow">
      <div>
        <label className="block font-medium mb-1">Weeks: {weeks}</label>
        <Slider min={4} max={26} value={weeks} onValueChange={setWeeks} />
      </div>
      <div>
        <label className="block font-medium mb-1">Hours/Week: {hoursPerWeek}</label>
        <Slider min={5} max={40} value={hoursPerWeek} onValueChange={setHours} />
      </div>
      <div>
        <label className="block font-medium mb-1">Difficulty</label>
        <div className="flex gap-2">
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff}
              type="button"
              className={`px-3 py-1 rounded-full border text-sm font-medium ${
                selectedDifficulty.includes(diff)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
              onClick={() => toggleDifficulty(diff)}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>
      <Button
        className="w-full bg-gradient-to-r from-indigo-500 to-blue-400 text-white"
        onClick={() =>
          onGenerate({ weeks, hoursPerWeek, difficulty: selectedDifficulty })
        }
      >
        Generate Plan
      </Button>
    </div>
  );
} 