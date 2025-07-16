import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  folder: string;
  status: 'to-revisit' | 'in-progress' | 'mastered';
  links: string[];
  createdAt: Date;
  updatedAt: Date;
}

const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Arrays',
    content: `# Arrays

## Overview
Arrays are fundamental data structures that store elements in contiguous memory locations.

## Key Operations
- Access: O(1)
- Search: O(n)
- Insertion: O(n)
- Deletion: O(n)

## Common Patterns
- Two pointers
- Sliding window
- Prefix sums

## Important Algorithms
- Sorting algorithms
- Binary search
- Kadane's algorithm`,
    tags: ['data-structure', 'fundamental'],
    folder: 'Arrays',
    status: 'in-progress',
    links: ['2', '3'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Strings',
    content: `# Strings

## Overview
Strings are sequences of characters, often implemented as arrays of characters.

## Key Operations
- Concatenation
- Substring extraction
- Pattern matching
- Case conversion

## Common Algorithms
- String matching (KMP, Rabin-Karp)
- Palindrome checking
- Anagram detection
- Longest common subsequence`,
    tags: ['data-structure', 'text-processing'],
    folder: 'Strings',
    status: 'to-revisit',
    links: ['1'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Linked Lists',
    content: `# Linked Lists

## Overview
Dynamic data structure where elements are stored in nodes, each containing data and a reference to the next node.

## Types
- Singly linked list
- Doubly linked list
- Circular linked list

## Key Operations
- Insertion: O(1) at head, O(n) at arbitrary position
- Deletion: O(1) if node is given, O(n) to find and delete
- Search: O(n)

## Common Problems
- Reverse linked list
- Detect cycle
- Merge sorted lists`,
    tags: ['data-structure', 'pointers'],
    folder: 'Linked Lists',
    status: 'mastered',
    links: ['4'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Recursion & Backtracking',
    content: `# Recursion & Backtracking

## Recursion
A function that calls itself with a smaller subproblem.

### Key Components
- Base case
- Recursive case
- Stack space consideration

## Backtracking
Systematic way to iterate through all possible solutions.

### Pattern
1. Choose
2. Explore
3. Unchoose (backtrack)

## Common Applications
- Tree traversal
- Permutations and combinations
- N-Queens problem
- Sudoku solver`,
    tags: ['algorithm', 'problem-solving'],
    folder: 'Recursion',
    status: 'in-progress',
    links: ['3', '5'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    title: 'Stack and Queue',
    content: `# Stack and Queue

## Stack (LIFO - Last In, First Out)
### Operations
- Push: O(1)
- Pop: O(1)
- Peek/Top: O(1)

### Applications
- Function call management
- Expression evaluation
- Undo operations
- Browser history

## Queue (FIFO - First In, First Out)
### Operations
- Enqueue: O(1)
- Dequeue: O(1)
- Front: O(1)

### Applications
- BFS traversal
- Process scheduling
- Handling requests`,
    tags: ['data-structure', 'fundamental'],
    folder: 'Stacks & Queues',
    status: 'to-revisit',
    links: ['4'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);

  const createNote = (folder: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '# New Note\n\nStart writing your DSA notes here...',
      tags: [],
      folder,
      status: 'in-progress',
      links: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setNotes(prev => [...prev, newNote]);
    setSelectedNote(newNote);
    return newNote;
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(prev => prev.map(note => 
      note.id === updatedNote.id 
        ? { ...updatedNote, updatedAt: new Date() }
        : note
    ));
    setSelectedNote(updatedNote);
    
    // Update bidirectional links
    if (updatedNote.links) {
      setNotes(prev => prev.map(note => {
        if (updatedNote.links.includes(note.id) && !note.links.includes(updatedNote.id)) {
          return { ...note, links: [...note.links, updatedNote.id] };
        }
        if (!updatedNote.links.includes(note.id) && note.links.includes(updatedNote.id)) {
          return { ...note, links: note.links.filter(id => id !== updatedNote.id) };
        }
        return note;
      }));
    }
  };

  const deleteNote = (noteId: string) => {
    // Remove links to this note from other notes
    setNotes(prev => prev
      .filter(note => note.id !== noteId)
      .map(note => ({
        ...note,
        links: note.links.filter(linkId => linkId !== noteId)
      }))
    );
    setSelectedNote(null);
  };

  return {
    notes,
    selectedNote,
    setSelectedNote,
    createNote,
    updateNote,
    deleteNote,
  };
};

// Supabase se questions fetch karne ka simple function (type strictness ke bina)
export async function fetchQuestions({ week, difficulty, topic } = {}) {
  let query = supabase.from('questions').select('*');

  if (week) query = query.eq('week', week);
  if (difficulty && difficulty.length) query = query.in('difficulty', difficulty);
  if (topic && topic.length) query = query.in('topic', topic);

  // Week aur number ke hisaab se sort
  const { data, error } = await query.order('week', { ascending: true }).order('number', { ascending: true });
  if (error) throw error;
  return data;
}
