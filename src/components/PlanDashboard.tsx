import WeekCard from './WeekCard';

export default function PlanDashboard({ plan, onProblemComplete }) {
  return (
    <div className="weeks-grid grid grid-cols-1 md:grid-cols-2 gap-4">
      {plan.weeks.map((week) => (
        <WeekCard
          key={week.number}
          week={week}
          onProblemComplete={onProblemComplete}
        />
      ))}
    </div>
  );
} 