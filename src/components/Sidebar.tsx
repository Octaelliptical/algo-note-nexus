import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Folder, Plus } from 'lucide-react';
import { SupabaseNote } from '@/hooks/useSupabaseNotes';

interface SidebarProps {
  selectedFolder: string;
  onFolderSelect: (folder: string) => void;
  notes: SupabaseNote[];
  onNoteSelect: (note: SupabaseNote) => void;
  onCreateNote: (folder: string) => void;
  searchQuery: string;
}

const folders = [
  'Arrays', 
  'Strings', 
  'Linked Lists', 
  'Recursion', 
  'Stacks & Queues', 
  'Trees', 
  'Graphs', 
  'Dynamic Programming', 
  'Searching', 
  'Sorting',
  'AI Generated'
];

export const Sidebar: React.FC<SidebarProps> = ({
  selectedFolder,
  onFolderSelect,
  notes,
  onCreateNote,
}) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">DSA Notes</h1>
        <p className="text-sm text-gray-600">Your algorithm knowledge graph</p>
      </div>

      {/* Folders */}
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Topics</h2>
          <Button
            size="sm"
            onClick={() => onCreateNote(selectedFolder === 'all' ? 'Arrays' : selectedFolder)}
            className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 rounded-full"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {folders.map(folder => (
            <Button
              key={folder}
              variant={selectedFolder === folder ? 'default' : 'ghost'}
              className="w-full justify-start text-sm h-12 font-medium rounded-xl"
              onClick={() => onFolderSelect(folder)}
            >
              <Folder className="w-5 h-5 mr-3 text-gray-500" />
              <span className="flex-1 text-left">{folder}</span>
              <Badge variant="secondary" className="ml-auto bg-gray-100 text-gray-600 rounded-full">
                {notes.filter(note => note.folder === folder).length}
              </Badge>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
