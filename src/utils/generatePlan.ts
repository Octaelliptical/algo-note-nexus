import { supabase } from '@/integrations/supabase/client';

export async function generatePlanWithAI(userPreferences: {
  weeks: number;
  hoursPerWeek: number;
  difficulty: string[];
}) {
  const prompt = `\nCreate a ${userPreferences.weeks}-week DSA study plan with:\n- ${userPreferences.hoursPerWeek} hours/week\n- Difficulty: ${userPreferences.difficulty.join(', ')}\n- Follow Grind 75's progression (Easy → Medium → Hard)\nOutput format:\n{\n  \"weeks\": [\n    {\n      \"number\": 1,\n      \"totalHours\": 15,\n      \"problems\": [\n        {\n          \"id\": \"lc-1\",\n          \"title\": \"Two Sum\",\n          \"difficulty\": \"Easy\",\n          \"topics\": [\"Array\"],\n          \"timeEstimate\": 15,\n          \"platformUrl\": \"https://leetcode.com/problems/two-sum\"\n        }\n      ]\n    }\n  ]\n}\n`;

  const { data, error } = await supabase.functions.invoke('groq-chat', {
    body: { message: prompt }
  });
  if (error) throw error;
  return JSON.parse(data.response);
} 