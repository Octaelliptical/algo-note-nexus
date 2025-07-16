import { supabase } from '@/integrations/supabase/client';

export async function fetchUserProgress(userId) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
}

export async function markQuestionCompleted(userId, questionId) {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert([
      {
        user_id: userId,
        question_id: questionId,
        completed: true,
        completed_at: new Date()
      }
    ]);
  if (error) throw error;
  return data;
} 