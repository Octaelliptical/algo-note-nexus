
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Trash2, Eye, Plus } from 'lucide-react';
import { StudyPlanGenerator } from '@/components/StudyPlanGenerator';

interface SavedPlan {
  id: string;
  title: string;
  content: string;
  created_at: string;
  duration: string;
  level: string;
}

export const StudyPlanManager = () => {
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [showGenerator, setShowGenerator] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SavedPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchSavedPlans();
  }, [user]);

  const fetchSavedPlans = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('folder', 'Study Plans')
      .eq('source_api', 'study-plan-generator')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching saved plans:', error);
      return;
    }

    const plans = data.map(note => ({
      id: note.id,
      title: note.title,
      content: note.content || '',
      created_at: note.created_at || '',
      duration: extractDuration(note.title),
      level: extractLevel(note.title)
    }));

    setSavedPlans(plans);
    setLoading(false);
  };

  const extractDuration = (title: string): string => {
    const match = title.match(/(\d+)-Day/);
    return match ? `${match[1]} days` : 'Unknown';
  };

  const extractLevel = (title: string): string => {
    const levels = ['Beginner', 'Intermediate', 'Advanced'];
    for (const level of levels) {
      if (title.toLowerCase().includes(level.toLowerCase())) {
        return level;
      }
    }
    return 'Unknown';
  };

  const deletePlan = async (planId: string) => {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', planId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete study plan",
        variant: "destructive",
      });
      return;
    }

    setSavedPlans(prev => prev.filter(plan => plan.id !== planId));
    toast({
      title: "Success",
      description: "Study plan deleted successfully",
    });
  };

  if (showGenerator) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Generate New Study Plan</h2>
          <Button variant="outline" onClick={() => setShowGenerator(false)}>
            Back to Saved Plans
          </Button>
        </div>
        <StudyPlanGenerator onPlanSaved={() => {
          setShowGenerator(false);
          fetchSavedPlans();
        }} />
      </div>
    );
  }

  if (selectedPlan) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{selectedPlan.title}</h2>
          <Button variant="outline" onClick={() => setSelectedPlan(null)}>
            Back to Plans
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm">
                {selectedPlan.content}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Study Plans</h2>
          <p className="text-gray-600">Manage your personalized DSA study plans</p>
        </div>
        <Button onClick={() => setShowGenerator(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create New Plan
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading saved plans...</p>
        </div>
      ) : savedPlans.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No study plans yet</h3>
            <p className="text-gray-600 mb-4">Create your first personalized DSA study plan</p>
            <Button onClick={() => setShowGenerator(true)}>
              Create Study Plan
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {savedPlans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                    <CardDescription>
                      Created on {new Date(plan.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{plan.duration}</Badge>
                    <Badge variant="outline">{plan.level}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 truncate flex-1 mr-4">
                    {plan.content.split('\n')[0].replace('# ', '')}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedPlan(plan)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deletePlan(plan.id)}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
