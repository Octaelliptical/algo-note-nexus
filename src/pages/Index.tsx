import React, { useState } from 'react';
import { GraphView } from '@/components/GraphView';
import { NoteEditor } from '@/components/NoteEditor';
import { Sidebar } from '@/components/Sidebar';
import { SearchBar } from '@/components/SearchBar';
import { NotePreview } from '@/components/NotePreview';
import { AuthForm } from '@/components/AuthForm';
import { AIFeatures } from '@/components/AIFeatures';
import { Header } from '@/components/Header';
import { UserProfile } from '@/components/UserProfile';
import { useAuth } from '@/hooks/useAuth';
import { useSupabaseNotes, SupabaseNote } from '@/hooks/useSupabaseNotes';
import { Bot, X, Share2 } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();
  const { notes, selectedNote, setSelectedNote, createNote, updateNote, deleteNote } = useSupabaseNotes();
  const [previewNote, setPreviewNote] = useState<SupabaseNote | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [showAIFeatures, setShowAIFeatures] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showGraphModal, setShowGraphModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  if (showProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header 
          showAIFeatures={showAIFeatures} 
          setShowAIFeatures={setShowAIFeatures}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
        />
        <UserProfile />
      </div>
    );
  }

  if (showAIFeatures) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header 
          showAIFeatures={showAIFeatures} 
          setShowAIFeatures={setShowAIFeatures}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
        />
        <AIFeatures />
      </div>
    );
  }

  // Transform SupabaseNote to Note format for compatibility
  const transformedNotes = notes.map(note => ({
    ...note,
    createdAt: new Date(note.created_at),
    updatedAt: new Date(note.updated_at)
  }));

  const handleNoteSelect = (note: any) => {
    // Find the original SupabaseNote
    const originalNote = notes.find(n => n.id === note.id);
    if (originalNote) {
      setSelectedNote(originalNote);
    }
  };

  const handleNoteUpdate = (note: any) => {
    // Transform back to SupabaseNote format
    const supabaseNote: SupabaseNote = {
      ...note,
      created_at: note.createdAt instanceof Date ? note.createdAt.toISOString() : note.createdAt,
      updated_at: note.updatedAt instanceof Date ? note.updatedAt.toISOString() : note.updatedAt,
      ai_generated: note.ai_generated || false,
      source_api: note.source_api || null,
      user_id: note.user_id || user.id
    };
    updateNote(supabaseNote);
  };

  const transformedSelectedNote = selectedNote ? {
    ...selectedNote,
    createdAt: new Date(selectedNote.created_at),
    updatedAt: new Date(selectedNote.updated_at)
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 flex w-full flex-col">
      <Header 
        showAIFeatures={showAIFeatures} 
        setShowAIFeatures={setShowAIFeatures}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
      />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar 
          selectedFolder={selectedFolder}
          onFolderSelect={setSelectedFolder}
          notes={transformedNotes}
          onNoteSelect={handleNoteSelect}
          onCreateNote={createNote}
          searchQuery={searchQuery}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="border-b border-gray-200 p-4 bg-white shadow-sm flex items-center justify-between">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              notes={transformedNotes}
              onNoteSelect={handleNoteSelect}
            />
            <button
              className="ml-4 flex items-center gap-2 px-3 py-2 rounded bg-gradient-to-r from-indigo-500 to-blue-400 text-white font-semibold shadow hover:from-blue-500 hover:to-indigo-400 transition-all"
              onClick={() => setShowGraphModal(true)}
              title="Open Graph View"
            >
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:inline">Graph View</span>
            </button>
          </div>

          {/* Graph and Editor Layout */}
          <div className="flex-1 flex min-h-0">
            {/* Graph View ab modal mein hoga, yahan nahi */}
            {/* Note Editor */}
            <div className="w-full bg-gray-50">
              <NoteEditor
                note={transformedSelectedNote}
                onUpdate={handleNoteUpdate}
                onDelete={deleteNote}
                allNotes={transformedNotes}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Graph Modal */}
      {showGraphModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full h-[80vh] flex flex-col relative animate-in slide-in-from-top-16">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setShowGraphModal(false)}
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold mb-2 px-6 pt-6 pb-2 bg-gradient-to-r from-indigo-500 to-blue-400 text-transparent bg-clip-text">Graph View</h2>
            <div className="flex-1 overflow-hidden p-4">
              <GraphView 
                notes={transformedNotes}
                selectedNote={transformedSelectedNote}
                onNoteSelect={handleNoteSelect}
                onNoteHover={() => {}}
                selectedFolder={selectedFolder}
              />
            </div>
          </div>
        </div>
      )}

      {/* Note Preview Modal */}
      {previewNote && (
        <NotePreview 
          note={{
            ...previewNote,
            created_at: previewNote.created_at,
            updated_at: previewNote.updated_at
          }}
          onClose={() => setPreviewNote(null)}
        />
      )}
    </div>
  );
};

export default Index;
