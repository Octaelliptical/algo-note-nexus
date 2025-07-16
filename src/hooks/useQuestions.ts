import { supabase } from '@/integrations/supabase/client';

export async function fetchQuestions({ week, difficulty, topic } = {}) {
  let query = supabase.from('questions').select('*');

  if (week) query = query.eq('week', week);
  if (difficulty && difficulty.length) query = query.in('difficulty', difficulty);
  if (topic && topic.length) query = query.in('topic', topic);

  // Week aur number ke hisaab se sort
  const { data, error } = await query.order('week', { ascending: true }).order('number', { ascending: true });
  if (error) throw error;
  return data;
} 