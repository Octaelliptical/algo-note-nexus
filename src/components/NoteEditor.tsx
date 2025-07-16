import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Edit3, Trash2, Plus, X, Link2, Bot } from 'lucide-react';
import { SupabaseNote } from '@/hooks/useSupabaseNotes';

interface NoteEditorProps {
  note: SupabaseNote | null;
  onUpdate: (note: SupabaseNote) => void;
  onDelete: (noteId: string) => void;
  allNotes?: SupabaseNote[];
}

const folders = ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming', 'Searching', 'Sorting'];

export const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  onUpdate,
  onDelete,
  allNotes = [],
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [folder, setFolder] = useState('Arrays');
  const [status, setStatus] = useState<'to-revisit' | 'in-progress' | 'mastered'>('in-progress');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [links, setLinks] = useState<string[]>([]);
  const [showLinkSelector, setShowLinkSelector] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiQuery, setAIQuery] = useState('');
  const [aiLoading, setAILoading] = useState(false);
  const [aiResult, setAIResult] = useState('');
  const [aiError, setAIError] = useState('');
  const [aiEdit, setAIEdit] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setFolder(note.folder);
      setStatus(note.status);
      setTags(note.tags);
      setLinks(note.links || []);
      setIsEditing(false);
    }
  }, [note]);

  const handleSave = () => {
    if (!note) return;
    
    const updatedNote: SupabaseNote = {
      ...note,
      title,
      content,
      folder,
      status,
      tags,
      links,
    };
    
    onUpdate(updatedNote);
    setIsEditing(false);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddLink = (noteId: string) => {
    if (!links.includes(noteId)) {
      setLinks([...links, noteId]);
    }
    setShowLinkSelector(false);
  };

  const handleRemoveLink = (linkId: string) => {
    setLinks(links.filter(id => id !== linkId));
  };

  const formatTextWithQuotes = (text: string) => {
    return text.replace(/"([^"]*)"/g, '<strong>$1</strong>');
  };

  const availableNotes = allNotes.filter(n => n.id !== note?.id && !links.includes(n.id));

  // Minimal AI call (Groq as default)
  const handleAIAssist = async () => {
    setAILoading(true);
    setAIError('');
    setAIResult('');
    setAIEdit('');
    try {
      const { data, error } = await import('@/integrations/supabase/client').then(({ supabase }) =>
        supabase.functions.invoke('groq-chat', { body: { message: aiQuery } })
      );
      if (error) throw error;
      setAIResult(data.response);
      setAIEdit(data.response);
    } catch (err: any) {
      setAIError('AI se answer nahi mila. Try again!');
    }
    setAILoading(false);
  };

  const handleInsertAIResult = () => {
    setContent(content + '\n' + aiEdit);
    setShowAIAssistant(false);
    setAIQuery('');
    setAIResult('');
    setAIEdit('');
    setAIError('');
  };

  if (!note) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 bg-gray-50">
        <div className="text-center">
          <Edit3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Select a note to start editing</h3>
          <p className="text-sm text-gray-500">Choose a note from the sidebar or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* Floating AI Assistant Button */}
      <button
        className="fixed bottom-8 right-8 z-30 bg-gradient-to-r from-indigo-500 to-blue-400 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2"
        onClick={() => setShowAIAssistant(true)}
        title="Open AI Assistant"
        style={{ boxShadow: '0 4px 24px 0 rgba(80,80,200,0.15)' }}
      >
        <Bot className="w-5 h-5" />
        <span className="font-semibold hidden sm:inline">AI Assistant</span>
      </button>

      {/* AI Assistant Side Panel */}
      {showAIAssistant && (
        <div className="fixed inset-0 bg-black/30 z-40 flex justify-end">
          <div className="w-full max-w-md h-full bg-white shadow-2xl p-6 flex flex-col relative animate-in slide-in-from-right-32">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setShowAIAssistant(false)}
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-indigo-500 to-blue-400 text-transparent bg-clip-text">AI Assistant</h3>
            <p className="text-gray-500 mb-4 text-sm">Stuck? Ask anything about DSA, code, concepts, or syntax. Edit & insert the answer directly into your note!</p>
            <textarea
              className="w-full rounded-lg border-blue-200 focus:ring-2 focus:ring-indigo-400 p-2 mb-2 min-h-[60px]"
              placeholder="Type your question or doubt..."
              value={aiQuery}
              onChange={e => setAIQuery(e.target.value)}
              disabled={aiLoading}
            />
            <button
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-400 text-white rounded-lg py-2 font-semibold shadow-lg hover:from-blue-500 hover:to-indigo-400 transition-all mb-2"
              onClick={handleAIAssist}
              disabled={aiLoading || !aiQuery}
            >
              {aiLoading ? 'Thinking...' : 'Get Answer'}
            </button>
            {aiError && <div className="text-red-500 text-sm mb-2">{aiError}</div>}
            {aiResult && (
              <>
                <label className="block text-sm font-medium mb-1 mt-2">Edit before inserting:</label>
                <textarea
                  className="w-full rounded-lg border-blue-200 focus:ring-2 focus:ring-indigo-400 p-2 min-h-[120px] mb-2"
                  value={aiEdit}
                  onChange={e => setAIEdit(e.target.value)}
                />
                <button
                  className="w-full bg-gradient-to-r from-green-500 to-blue-400 text-white rounded-lg py-2 font-semibold shadow-lg hover:from-blue-500 hover:to-green-400 transition-all"
                  onClick={handleInsertAIResult}
                >
                  Insert to Note
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-gray-200 p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          {isEditing ? (
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-bold border-gray-300 text-gray-900 bg-white focus:border-blue-500"
              placeholder="Note title..."
            />
          ) : (
            <h1 className="text-xl font-bold text-gray-900">{note.title}</h1>
          )}
          
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(false)} className="border-gray-300">
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="border-gray-300">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(note.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm mb-4">
          {isEditing ? (
            <>
              <Select value={folder} onValueChange={setFolder}>
                <SelectTrigger className="w-40 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  {folders.map(f => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                <SelectTrigger className="w-40 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="to-revisit">To Revisit</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="mastered">Mastered</SelectItem>
                </SelectContent>
              </Select>
            </>
          ) : (
            <>
              <Badge variant="outline" className="border-gray-300 text-gray-700 bg-gray-50">{note.folder}</Badge>
              <Badge 
                className={
                  note.status === 'mastered' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                  note.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                  'bg-amber-100 text-amber-800 border-amber-200'
                }
              >
                {note.status.replace('-', ' ')}
              </Badge>
            </>
          )}
        </div>

        {/* Links */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Link2 className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Linked Notes</span>
            {isEditing && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowLinkSelector(!showLinkSelector)}
                className="h-6 px-2 text-xs border-gray-300"
              >
                <Plus className="w-3 h-3" />
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {links.map(linkId => {
              const linkedNote = allNotes.find(n => n.id === linkId);
              return linkedNote ? (
                <Badge key={linkId} variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                  {linkedNote.title}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveLink(linkId)}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Badge>
              ) : null;
            })}
          </div>

          {showLinkSelector && isEditing && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Link to other notes:</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {availableNotes.map(availableNote => (
                  <button
                    key={availableNote.id}
                    onClick={() => handleAddLink(availableNote.id)}
                    className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    {availableNote.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {(isEditing ? tags : note.tags).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700 border-gray-200">
              #{tag}
              {isEditing && (
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </Badge>
          ))}
        </div>
        
        {isEditing && (
          <div className="flex gap-2">
            <Input
              placeholder="Add tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              className="flex-1 h-9 text-sm bg-white border-gray-300"
            />
            <Button size="sm" onClick={handleAddTag} className="h-9 px-3 bg-gray-600 hover:bg-gray-700">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {isEditing ? (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Write your DSA notes here... Use "quotes" to make text bold!'
            className="h-full min-h-96 resize-none bg-white border-gray-300 text-gray-800 placeholder-gray-500 font-mono text-sm focus:border-blue-500 transition-all duration-200"
          />
        ) : (
          <div className="prose prose-gray max-w-none">
            <div 
              className="whitespace-pre-wrap text-gray-800 font-mono text-sm leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200"
              dangerouslySetInnerHTML={{ __html: formatTextWithQuotes(note.content) }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
