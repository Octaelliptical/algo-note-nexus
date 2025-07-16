import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, FileText } from 'lucide-react';
import { Note } from '@/hooks/useNotes';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  notes: Note[];
  onNoteSelect: (note: Note) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  notes,
  onNoteSelect,
}) => {
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = value.trim() ? notes.filter(note => 
    note.title.toLowerCase().includes(value.toLowerCase()) ||
    note.content.toLowerCase().includes(value.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
  ).slice(0, 8) : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % searchResults.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + searchResults.length) % searchResults.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (searchResults[selectedIndex]) {
          onNoteSelect(searchResults[selectedIndex]);
          setShowResults(false);
          onChange('');
        }
        break;
      case 'Escape':
        setShowResults(false);
        break;
    }
  };

  return (
    <div ref={searchRef} className="relative max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search notes, tags, or content..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowResults(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
          {searchResults.map((note, index) => (
            <div
              key={note.id}
              className={`p-4 cursor-pointer transition-colors ${
                index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => {
                onNoteSelect(note);
                setShowResults(false);
                onChange('');
              }}
            >
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">{note.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {note.content.replace(/[#*`]/g, '').slice(0, 100)}...
                  </p>
                  <div className="flex gap-1 mt-2">
                    {note.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs border-gray-300 text-gray-600">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
