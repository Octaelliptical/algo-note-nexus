
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseNotes } from '@/hooks/useSupabaseNotes';
import { Calendar, Clock, Target, BookOpen } from 'lucide-react';

interface StudyPlan {
  day: number;
  topics: string[];
  subtopics: string[];
  problems: {
    title: string;
    platform: string;
    difficulty: string;
    url: string;
    concepts: string[];
    estimated_time: string;
  }[];
  revision: string[];
  is_break_day: boolean;
  daily_goals: string[];
  resources: {
    type: string;
    title: string;
    url: string;
  }[];
}

interface StudyPlanGeneratorProps {
  onPlanSaved?: () => void;
}

export const StudyPlanGenerator = ({ onPlanSaved }: StudyPlanGeneratorProps) => {
  const [duration, setDuration] = useState('30');
  const [level, setLevel] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [focusAreas, setFocusAreas] = useState('');
  const [weakAreas, setWeakAreas] = useState('');
  const [platform, setPlatform] = useState('');
  const [loading, setLoading] = useState(false);
  const [studyPlan, setStudyPlan] = useState<StudyPlan[]>([]);
  const { createAINote } = useSupabaseNotes();
  const { toast } = useToast();

  const generateStudyPlan = async () => {
    if (!level || !hoursPerDay || !platform) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const prompt = `Act as an expert DSA tutor. Create a comprehensive ${duration}-day study plan for ${level} learners with:

**Constraints:**
- ${hoursPerDay} hours/day availability
- Focus areas: ${focusAreas || 'all topics'}
- Weak areas: ${weakAreas || 'none specified'}
- Preferred platform: ${platform}

**Plan Requirements:**
1. **Detailed Phased Structure**: Progressive learning from basics to advanced
2. **Daily Breakdown** (per day):
   - Concept Study (30% time): Topic + detailed Subtopics
   - Problem Solving (60% time): 5-15 problems with difficulty distribution and estimated time
   - Revision (10% time): Previous topics with specific focus areas
3. **Enhanced Features**:
   - Include 1 break day every 7 days
   - Add revision days every 4-5 days
   - Progressive problem count (start with 5-8 problems, increase to 12-15)
   - Daily learning goals and milestones
   - Resource recommendations (articles, videos)
   - Time estimates for each activity

**Output Format**: Provide a detailed study plan in JSON format with each day containing:
{
  "day": number,
  "topics": ["topic1", "topic2"],
  "subtopics": ["subtopic1 with details", "subtopic2 with examples"],
  "problems": [
    {
      "title": "Problem Name",
      "platform": "${platform}",
      "difficulty": "Easy/Medium/Hard",
      "url": "https://example.com/problem",
      "concepts": ["concept1", "concept2"],
      "estimated_time": "15-20 minutes"
    }
  ],
  "revision": ["Previous Day Topics with focus"],
  "is_break_day": false,
  "daily_goals": ["goal1", "goal2"],
  "resources": [
    {
      "type": "article/video",
      "title": "Resource Title",
      "url": "https://example.com"
    }
  ]
}

Make it comprehensive, detailed, and practical for a ${level} level student with clear progression and measurable goals.`;

      const { data, error } = await supabase.functions.invoke('groq-chat', {
        body: { message: prompt }
      });

      if (error) throw error;
      
      // Try to parse JSON from the response
      let parsedPlan: StudyPlan[] = [];
      try {
        // Extract JSON from the response if it's embedded in text
        const jsonMatch = data.response.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          parsedPlan = JSON.parse(jsonMatch[0]);
        } else {
          // If no JSON array found, create a structured plan from the text
          parsedPlan = createDetailedStructuredPlan(data.response, parseInt(duration), level, hoursPerDay);
        }
      } catch (parseError) {
        // Fallback: create a structured plan from the text response
        parsedPlan = createDetailedStructuredPlan(data.response, parseInt(duration), level, hoursPerDay);
      }

      setStudyPlan(parsedPlan);
      
      toast({
        title: "Study Plan Generated",
        description: `Your detailed ${duration}-day ${level} study plan is ready!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate study plan. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const createDetailedStructuredPlan = (response: string, days: number, level: string, hours: string): StudyPlan[] => {
    const plan: StudyPlan[] = [];
    const topics = level === 'beginner' 
      ? ['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Trees & BST', 'Graphs', 'Dynamic Programming', 'Sorting & Searching']
      : level === 'intermediate'
      ? ['Advanced Arrays', 'Tree Algorithms', 'Graph Algorithms', 'Dynamic Programming', 'Greedy Algorithms', 'Backtracking', 'String Algorithms']
      : ['Advanced DP', 'Complex Graph Algorithms', 'String Algorithms', 'Math & Number Theory', 'System Design', 'Advanced Data Structures'];

    const hoursNum = parseInt(hours);
    const conceptTime = Math.floor(hoursNum * 0.3);
    const problemTime = Math.floor(hoursNum * 0.6);
    const revisionTime = Math.floor(hoursNum * 0.1);

    for (let day = 1; day <= days; day++) {
      const isBreakDay = day % 7 === 0;
      const isRevisionDay = (day % 5 === 0 || day % 4 === 0) && !isBreakDay;
      const topicIndex = Math.floor((day - 1) / Math.ceil(days / topics.length));
      const currentTopic = topics[Math.min(topicIndex, topics.length - 1)];
      
      const problemCount = isBreakDay ? 0 : Math.min(5 + Math.floor(day / 5), 15);
      const difficulties = level === 'beginner' ? ['Easy', 'Easy', 'Medium'] : 
                          level === 'intermediate' ? ['Easy', 'Medium', 'Medium', 'Hard'] : 
                          ['Medium', 'Medium', 'Hard', 'Hard'];

      plan.push({
        day,
        topics: isBreakDay ? [] : [currentTopic],
        subtopics: isBreakDay ? [] : [
          `${currentTopic} fundamentals and core concepts`,
          `Common patterns and techniques in ${currentTopic}`,
          `Time and space complexity analysis`
        ],
        problems: isBreakDay ? [] : Array.from({ length: problemCount }, (_, i) => ({
          title: `${currentTopic} Practice Problem ${i + 1}`,
          platform: platform,
          difficulty: difficulties[i % difficulties.length],
          url: `https://${platform.toLowerCase().replace(/\s+/g, '')}.com`,
          concepts: [currentTopic, 'Problem Solving'],
          estimated_time: `${15 + i * 5}-${25 + i * 5} minutes`
        })),
        revision: isRevisionDay ? [`Review ${topics[Math.max(0, topicIndex - 1)]} concepts and common mistakes`] : [],
        is_break_day: isBreakDay,
        daily_goals: isBreakDay ? ['Rest and mental recovery', 'Light review of previous concepts'] : [
          `Master ${currentTopic} core concepts (${conceptTime}h)`,
          `Solve ${problemCount} problems efficiently (${problemTime}h)`,
          `Review and reinforce learning (${revisionTime}h)`
        ],
        resources: isBreakDay ? [] : [
          {
            type: 'article',
            title: `${currentTopic} Complete Guide`,
            url: 'https://www.geeksforgeeks.org'
          },
          {
            type: 'video',
            title: `${currentTopic} Video Tutorial`,
            url: 'https://www.youtube.com'
          }
        ]
      });
    }

    return plan;
  };

  const saveStudyPlan = async () => {
    if (studyPlan.length === 0) return;

    const planContent = `# ${duration}-Day ${level.charAt(0).toUpperCase() + level.slice(1)} DSA Study Plan

## Plan Overview
- **Duration**: ${duration} days
- **Level**: ${level}
- **Hours per day**: ${hoursPerDay}
- **Focus areas**: ${focusAreas || 'All topics'}
- **Weak areas**: ${weakAreas || 'None specified'}
- **Platform**: ${platform}

## Daily Schedule

${studyPlan.map(day => `
### Day ${day.day}${day.is_break_day ? ' (Break Day)' : ''}

${day.is_break_day ? '**🎯 Goals**: Rest and review previous concepts\n**📚 Activities**: Light review, mental recovery' : `
**📚 Topics**: ${day.topics.join(', ')}
**🔍 Subtopics**: 
${day.subtopics.map(subtopic => `- ${subtopic}`).join('\n')}

**🎯 Daily Goals**:
${day.daily_goals.map(goal => `- ${goal}`).join('\n')}

**💻 Problems to solve** (${day.problems.length} problems):
${day.problems.map(p => `- [${p.title}](${p.url}) (${p.difficulty}) - ${p.estimated_time}
  - Concepts: ${p.concepts.join(', ')}`).join('\n')}

${day.revision.length > 0 ? `**🔄 Revision Focus**: ${day.revision.join(', ')}` : ''}

**📖 Resources**:
${day.resources.map(r => `- [${r.title}](${r.url}) (${r.type})`).join('\n')}
`}
`).join('\n')}

## Progress Tracking
${Array.from({ length: Math.ceil(parseInt(duration) / 7) }, (_, i) => `- [ ] Week ${i + 1} completed`).join('\n')}

## Weekly Milestones
- **Week 1**: Foundation concepts mastery
- **Week 2**: Intermediate problem solving
- **Week 3**: Advanced topics introduction
- **Week 4**: Integration and mock interviews

## Notes & Reflections
**Daily Log**: Add your progress notes here...
- What went well?
- What was challenging?
- Key insights learned
- Areas needing more focus

## Performance Metrics
- **Problems solved**: ___/${studyPlan.reduce((sum, day) => sum + day.problems.length, 0)}
- **Concepts mastered**: ___
- **Mock interviews completed**: ___
- **Weak areas improved**: ___
`;

    const note = await createAINote(
      `${duration}-Day ${level} DSA Study Plan`,
      planContent,
      'Study Plans',
      'study-plan-generator'
    );
    
    if (note) {
      toast({
        title: "Study Plan Saved",
        description: "Your detailed study plan has been saved to your notes",
      });
      onPlanSaved?.();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            DSA Study Plan Generator
          </CardTitle>
          <CardDescription>
            Create a comprehensive, personalized Data Structures & Algorithms study plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Duration (days)</label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Learning Level *</label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Hours per day *</label>
              <Input
                type="number"
                placeholder="e.g., 3"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(e.target.value)}
                min="1"
                max="12"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Preferred Platform *</label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LeetCode">LeetCode</SelectItem>
                  <SelectItem value="GeeksforGeeks">GeeksforGeeks</SelectItem>
                  <SelectItem value="Codeforces">Codeforces</SelectItem>
                  <SelectItem value="HackerRank">HackerRank</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Focus Areas (optional)</label>
            <Input
              placeholder="e.g., Arrays, Graphs, Dynamic Programming"
              value={focusAreas}
              onChange={(e) => setFocusAreas(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Weak Areas (optional)</label>
            <Input
              placeholder="e.g., Recursion, Backtracking"
              value={weakAreas}
              onChange={(e) => setWeakAreas(e.target.value)}
            />
          </div>

          <Button onClick={generateStudyPlan} disabled={loading} className="w-full">
            {loading ? "Generating Detailed Plan..." : "Generate Study Plan"}
          </Button>
        </CardContent>
      </Card>

      {studyPlan.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Your Detailed Study Plan Preview
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={saveStudyPlan} size="sm">
                Save to Notes
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {studyPlan.slice(0, 5).map((day) => (
                <div key={day.day} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Day {day.day}
                    </h3>
                    {day.is_break_day && <Badge variant="secondary">Break Day</Badge>}
                  </div>
                  
                  {!day.is_break_day && (
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>📚 Topics:</strong> {day.topics.join(', ')}
                      </div>
                      <div>
                        <strong>🔍 Subtopics:</strong>
                        <ul className="list-disc list-inside ml-2 mt-1">
                          {day.subtopics.map((subtopic, idx) => (
                            <li key={idx}>{subtopic}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong>🎯 Daily Goals:</strong>
                        <ul className="list-disc list-inside ml-2 mt-1">
                          {day.daily_goals.map((goal, idx) => (
                            <li key={idx}>{goal}</li>
                          ))}
                        </ul>
                      </div>
                      {day.problems.length > 0 && (
                        <div>
                          <strong>💻 Problems ({day.problems.length}):</strong>
                          <ul className="list-disc list-inside ml-2 mt-1">
                            {day.problems.slice(0, 3).map((problem, idx) => (
                              <li key={idx}>
                                {problem.title} ({problem.difficulty}) - {problem.estimated_time}
                              </li>
                            ))}
                            {day.problems.length > 3 && (
                              <li className="text-gray-500">... and {day.problems.length - 3} more</li>
                            )}
                          </ul>
                        </div>
                      )}
                      {day.resources.length > 0 && (
                        <div>
                          <strong>📖 Resources:</strong>
                          <ul className="list-disc list-inside ml-2 mt-1">
                            {day.resources.map((resource, idx) => (
                              <li key={idx}>{resource.title} ({resource.type})</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {day.is_break_day && (
                    <div className="text-sm text-gray-600">
                      <p><strong>🎯 Goals:</strong> {day.daily_goals.join(', ')}</p>
                      <p className="mt-1">Rest day - Light review and mental recovery</p>
                    </div>
                  )}
                </div>
              ))}
              
              {studyPlan.length > 5 && (
                <div className="text-center text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  ... and {studyPlan.length - 5} more detailed days (save to view complete plan)
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
