
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, ExternalLink } from 'lucide-react';
import { SupabaseNote } from '@/hooks/useSupabaseNotes';

interface NotePreviewProps {
  note: SupabaseNote;
  onClose: () => void;
}

export const NotePreview: React.FC<NotePreviewProps> = ({ note, onClose }) => {
  const renderMarkdown = (text: string) => {
    return text
      .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold mb-3 text-gray-900">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-lg font-semibold mb-2 text-gray-800">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-base font-medium mb-2 text-gray-700">$1</h3>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 p-3 rounded-md mb-3 overflow-x-auto"><code class="text-xs text-gray-800">$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-xs text-gray-800">$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic text-gray-700">$1</em>')
      .replace(/^\- (.+)$/gm, '<li class="ml-3 text-gray-700">• $1</li>')
      .replace(/\[\[(.+?)\]\]/g, '<span class="text-blue-600 cursor-pointer hover:underline">$1</span>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 truncate">{note.title}</h2>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="border-gray-300 text-gray-700">{note.folder}</Badge>
              <Badge 
                className={
                  note.status === 'mastered' ? 'bg-emerald-100 text-emerald-800' :
                  note.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-amber-100 text-amber-800'
                }
              >
                {note.status.replace('-', ' ')}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <Button size="sm" variant="outline" className="border-gray-300">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tags */}
        {note.tags.length > 0 && (
          <div className="px-6 py-3 border-b border-gray-100">
            <div className="flex flex-wrap gap-1">
              {note.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          <div 
            className="prose prose-gray prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(note.content) }}
          />
        </div>
      </div>
    </div>
  );
};
