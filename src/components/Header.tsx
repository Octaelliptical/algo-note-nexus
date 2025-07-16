import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User, Bot, UserCircle, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useProfile } from '@/hooks/useProfile';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  showAIFeatures: boolean;
  setShowAIFeatures: (show: boolean) => void;
  showProfile?: boolean;
  setShowProfile?: (show: boolean) => void;
}

export const Header = ({ showAIFeatures, setShowAIFeatures, showProfile, setShowProfile }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  return (
    <div className="border-b border-gray-200 p-4 bg-white shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          className="text-xl font-bold text-gray-900 hover:text-blue-600 focus:outline-none"
          onClick={() => {
            navigate('/');
            if (setShowProfile) setShowProfile(false);
          }}
        >
          DSA Notes
        </button>
        <Button
          variant={showAIFeatures ? "default" : "outline"}
          size="sm"
          onClick={() => setShowAIFeatures(!showAIFeatures)}
          className="flex items-center gap-2"
        >
          <Bot className="w-4 h-4" />
          AI Features
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/study-plans/new')}
          className="flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Grind Plan
        </Button>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={profile?.avatar_url || ''} />
            <AvatarFallback>
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">
            {profile?.username || user?.email}
          </span>
        </div>
        
        {setShowProfile && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2"
          >
            <UserCircle className="w-4 h-4" />
            Profile
          </Button>
        )}
        
        <Button variant="outline" size="sm" onClick={signOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};
