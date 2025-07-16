import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '@/hooks/useQuestions';
import { generateDynamicPlan } from '@/utils/generateDynamicPlan';
import { fetchUserProgress, markQuestionCompleted } from '@/hooks/useUserProgress';
import { useUser } from '@supabase/auth-helpers-react';
import { Bot, Clock, ListChecks, BarChart3, Tag, ArrowLeft } from 'lucide-react';
import { AIFeatures } from '@/components/AIFeatures';
import { Link } from 'react-router-dom';

const StudyPlansNew: React.FC = () => {
  const [questions, setQuestions] = useState([]);
  const [weeks, setWeeks] = useState(1);
  const [hours, setHours] = useState(40);
  const [plan, setPlan] = useState({ weekWise: [], summary: null });
  const [progress, setProgress] = useState([]);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const user = useUser();

  useEffect(() => {
    fetchQuestions({}).then(setQuestions);
  }, []);

  useEffect(() => {
    if (questions.length) {
      setPlan(generateDynamicPlan(questions, weeks, hours));
    }
  }, [questions, weeks, hours]);

  useEffect(() => {
    if (user) fetchUserProgress(user.id).then(setProgress);
  }, [user]);

  const handleComplete = async (questionId: number) => {
    if (!user) return;
    await markQuestionCompleted(user.id, questionId);
    fetchUserProgress(user.id).then(setProgress);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f8fafc] to-[#c7d2fe] dark:from-[#232946] dark:via-[#16161a] dark:to-[#232946]">
      {/* Sidebar */}
      <aside className="w-80 p-6 border-r border-indigo-100/60 dark:border-indigo-900/40 flex-shrink-0 sticky top-0 h-screen overflow-y-auto z-10 bg-white/60 dark:bg-[#232946]/70 backdrop-blur-xl shadow-2xl rounded-r-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-white/70 dark:bg-[#232946]/70 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all text-sm font-medium shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white drop-shadow">Customize Plan</h2>
          <button
            className="relative flex items-center gap-2 px-2 py-1 rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 text-white font-semibold shadow-xl hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-indigo-600 active:scale-95 transition-all duration-200 border border-white/30 backdrop-blur-md before:absolute before:inset-0 before:rounded-full before:bg-white/10 before:blur-[2px] before:opacity-60 before:-z-10 text-sm"
            onClick={() => setShowAIAssistant(true)}
            title="Open Help Assistant"
            style={{ boxShadow: '0 4px 16px 0 rgba(80,80,200,0.12), 0 1px 4px 0 rgba(80,80,200,0.08)' }}
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 shadow-inner mr-1">
              <Bot className="w-4 h-4 drop-shadow" />
            </span>
            <span className="hidden sm:inline">Help</span>
          </button>
        </div>
        <div className="mb-8">
          <label className="font-medium text-gray-700 dark:text-gray-200">Schedule</label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              Weeks:
              <input
                type="range"
                min={1}
                max={20}
                value={weeks}
                onChange={e => setWeeks(Number(e.target.value))}
                className="w-32 accent-indigo-500"
              />
              <span className="ml-2 font-semibold text-indigo-600 dark:text-indigo-300">{weeks}</span>
            </div>
            <div className="flex items-center gap-2">
              Hours/Week:
              <input
                type="range"
                min={1}
                max={40}
                value={hours}
                onChange={e => setHours(Number(e.target.value))}
                className="w-32 accent-indigo-500"
              />
              <span className="ml-2 font-semibold text-indigo-600 dark:text-indigo-300">{hours}</span>
            </div>
          </div>
        </div>
        {plan.summary && (
          <div className="mb-6 bg-white/80 dark:bg-[#232946]/80 rounded-xl shadow border border-indigo-100/60 dark:border-indigo-900/40 p-3 text-sm">
            <div className="font-bold text-base mb-2 text-gray-900 dark:text-white">Questions Summary</div>
            <div className="mb-2">
              <span className="text-indigo-700 dark:text-indigo-300 font-semibold">{Math.round(plan.summary.totalMinutes / 60)}h</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-blue-700 dark:text-blue-300 font-semibold">{plan.summary.totalQuestions} Qs</span>
            </div>
            <div className="mb-2 flex gap-1 flex-wrap">
              {(['Easy','Medium','Hard'] as const).map((level) => (
                plan.summary.difficulty[level] ? (
                  <span
                    key={level}
                    className={
                      level === 'Easy'
                        ? 'bg-emerald-100/80 text-emerald-700 px-2 py-0.5 rounded-full font-semibold'
                        : level === 'Medium'
                        ? 'bg-yellow-100/80 text-yellow-700 px-2 py-0.5 rounded-full font-semibold'
                        : 'bg-red-100/80 text-red-700 px-2 py-0.5 rounded-full font-semibold'
                    }
                    style={{ fontSize: '0.85em' }}
                  >
                    {level[0]}: {plan.summary.difficulty[level]}
                  </span>
                ) : null
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {Object.entries(plan.summary.topics).map(([k, v]) => (
                <span key={k} className="bg-indigo-100/80 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-200 px-2 py-0.5 rounded-full font-medium" style={{ fontSize: '0.82em' }}>
                  {k}: <span className="font-bold ml-1">{String(v)}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>
      {/* AI Assistant Side Panel */}
      {showAIAssistant && (
        <div className="fixed inset-0 bg-black/30 z-40 flex justify-end">
          <div className="w-full max-w-xl h-full bg-white dark:bg-[#16161a] shadow-2xl flex flex-col relative animate-in slide-in-from-right-32 rounded-l-3xl">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setShowAIAssistant(false)}
              title="Close"
            >
              <span className="text-2xl">×</span>
            </button>
            <AIFeatures />
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className="flex-1">
        <div className="grid grid-cols-1 gap-8">
          {plan.weekWise.map((weekQuestions, i) => (
            <div key={i} className="mb-12 bg-white/80 dark:bg-[#232946]/80 rounded-3xl border border-indigo-100/60 dark:border-indigo-900/40 p-8 md:p-10 backdrop-blur-lg w-full">
              <h2 className="font-bold text-2xl mb-4 text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text drop-shadow-lg">Week {i + 1} <span className="text-gray-500 text-lg font-normal">({weekQuestions.length} questions)</span></h2>
              {weekQuestions.length === 0 ? (
                <div className="text-gray-400">No questions for this week.</div>
              ) : (
                <div>
                  {weekQuestions.map((q, idx) => (
                    <div
                      key={q.id}
                      className={
                        `flex items-center justify-between py-4 px-2 group hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20 transition-all duration-150` +
                        (idx !== weekQuestions.length - 1 ? ' border-b-2 border-indigo-300/70 dark:border-indigo-800/70 my-1' : '')
                      }
                    >
                      <div className="flex-1 min-w-0">
                        <strong className="text-indigo-700 dark:text-indigo-300">{q.week}.{q.number}</strong> — <a href={q.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-300 hover:underline font-medium transition-all duration-150">{q.title}</a>
                        <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                          <span className="mr-2 font-semibold">{q.difficulty}</span> | <span className="mr-2">{q.topic}</span> | <span>{q.estimated_time}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-end flex-shrink-0 ml-4">
                        <input
                          type="checkbox"
                          checked={progress.some(p => p.question_id === q.id && p.completed)}
                          onChange={() => handleComplete(q.id)}
                          className="w-5 h-5 accent-emerald-500 transition-all duration-150 group-hover:scale-110"
                          title="Mark as completed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudyPlansNew; 