export function generateDynamicPlan(questions, weeks, hoursPerWeek) {
  // Total available minutes
  const totalMinutes = weeks * hoursPerWeek * 60;
  let selected = [];
  let sum = 0;

  // Questions ko estimated_time ke hisaab se select karo
  for (const q of questions) {
    // estimated_time string se number nikaalo (e.g. "15 mins" => 15)
    const mins = parseInt(q.estimated_time);
    if (sum + mins > totalMinutes) break;
    selected.push(q);
    sum += mins;
  }

  // Week-wise distribute karo
  const perWeek = Math.ceil(selected.length / weeks);
  const weekWise = [];
  for (let i = 0; i < weeks; i++) {
    weekWise.push(selected.slice(i * perWeek, (i + 1) * perWeek));
  }

  // Summary
  const summary = {
    totalQuestions: selected.length,
    totalMinutes: sum,
    difficulty: {},
    topics: {},
  };
  for (const q of selected) {
    // Difficulty aur topic ko normalize karo
    const diff = q.difficulty.trim().charAt(0).toUpperCase() + q.difficulty.trim().slice(1).toLowerCase();
    const topic = q.topic.trim();
    summary.difficulty[diff] = (summary.difficulty[diff] || 0) + 1;
    summary.topics[topic] = (summary.topics[topic] || 0) + 1;
  }

  return { weekWise, summary };
} 