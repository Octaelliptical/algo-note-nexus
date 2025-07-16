import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseNotes } from '@/hooks/useSupabaseNotes';
import { StudyPlanManager } from '@/components/StudyPlanManager';
import { Bot, Search, Brain, Calendar, Sparkles } from 'lucide-react';

const quickActions = [
  { key: 'research', label: 'Research', icon: <Search className="w-4 h-4" /> },
  { key: 'explain', label: 'Explain', icon: <Bot className="w-4 h-4" /> },
  { key: 'summarize', label: 'Summarize', icon: <Sparkles className="w-4 h-4" /> },
  { key: 'studyplan', label: 'Generate Plan', icon: <Calendar className="w-4 h-4" /> },
];

export const AIFeatures = () => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('explain');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [aiEdit, setAIEdit] = useState('');
  const { createAINote } = useSupabaseNotes();
  const { toast } = useToast();

  const handleAI = async () => {
    setLoading(true);
    setResult('');
    setAIEdit('');
    try {
      let data, error;
      if (mode === 'explain') {
        ({ data, error } = await supabase.functions.invoke('groq-chat', { body: { message: query } }));
        if (error) throw error;
        setResult(data.response);
        setAIEdit(data.response);
      } else if (mode === 'research') {
        ({ data, error } = await supabase.functions.invoke('tavily-search', { body: { query } }));
        if (error) throw error;
        setResult(data.content);
        setAIEdit(data.content);
      } else if (mode === 'summarize') {
        ({ data, error } = await supabase.functions.invoke('huggingface-generate', { body: { prompt: `Summarize: ${query}` } }));
        if (error) throw error;
        setResult(data.generated_text);
        setAIEdit(data.generated_text);
      } else if (mode === 'studyplan') {
        setResult('studyplan');
      }
      if (mode !== 'studyplan') {
        toast({ title: 'AI Response', description: 'AI has processed your query.' });
      }
    } catch (err) {
      toast({ title: 'Error', description: 'AI se answer nahi mila. Try again!', variant: 'destructive' });
    }
    setLoading(false);
  };

  const handleSaveAsNote = async () => {
    if (!aiEdit) return;
    await createAINote(
      `${mode.charAt(0).toUpperCase() + mode.slice(1)} Generated: ${query.substring(0, 30)}...`,
      aiEdit,
      'AI Generated',
      mode
    );
    toast({ title: 'Note saved', description: 'AI-generated content saved to your notes' });
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 via-white to-indigo-100 min-h-[90vh] rounded-2xl shadow-2xl">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-indigo-500 to-blue-400 text-transparent bg-clip-text">
          AI Assistant
        </h2>
        <p className="text-gray-600">Enhance your notes with AI research, explanations, summaries, and study planning</p>
      </div>
      <Card className="bg-white/90 shadow-xl border-0 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text">
            <Bot className="w-5 h-5" />
            Ask AI
          </CardTitle>
          <CardDescription>
            Select an action, type your query, and get instant help!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Action Chips */}
          <div className="flex gap-2 mb-2 flex-wrap">
            {quickActions.map(action => (
              <button
                key={action.key}
                className={`flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium transition-all shadow-sm
                  ${mode === action.key
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-400 text-white border-transparent scale-105 shadow-lg'
                    : 'bg-white border-blue-200 text-blue-700 hover:bg-blue-50'}
                `}
                onClick={() => setMode(action.key)}
                type="button"
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
          {/* Input Box */}
          {mode !== 'studyplan' && (
            <Textarea
              placeholder={
                mode === 'research' ? 'Search the web for resources, facts, or articles...'
                : mode === 'summarize' ? 'Paste text or topic to summarize...'
                : 'Type your question, prompt, or request...'
              }
              value={query}
              onChange={e => setQuery(e.target.value)}
              rows={3}
              className="rounded-lg border-blue-200 focus:ring-2 focus:ring-indigo-400"
              disabled={loading}
            />
          )}
          {/* Submit Button */}
          {mode !== 'studyplan' && (
            <Button
              onClick={handleAI}
              disabled={loading || !query}
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-400 text-white shadow-lg hover:from-blue-500 hover:to-indigo-400 transition-all"
            >
              {loading ? 'Thinking...' : quickActions.find(a => a.key === mode)?.label || 'Ask AI'}
            </Button>
          )}
          {/* Result Area */}
          {result && result !== 'studyplan' && (
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center">
                <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white shadow">
                  AI Result
                </Badge>
                <Button size="sm" onClick={handleSaveAsNote} className="bg-gradient-to-r from-blue-400 to-green-400 text-white shadow">
                  Save as Note
                </Button>
              </div>
              <Textarea
                value={aiEdit}
                onChange={e => setAIEdit(e.target.value)}
                className="min-h-[120px] rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
          {mode === 'studyplan' && (
            <div className="mt-4">
              <StudyPlanManager />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
