import React, { useState } from 'react';
import { BookOpen, Plus, Search, Pin } from 'lucide-react';
import type { MemoryVaultNote } from '../services/caseEngine';

interface CaseNotebookStudioProps {
  initialNotes: MemoryVaultNote[];
}

export const CaseNotebookStudio: React.FC<CaseNotebookStudioProps> = ({ initialNotes }) => {
  const [notes, setNotes] = useState<MemoryVaultNote[]>(initialNotes);
  const [newNoteText, setNewNoteText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote: MemoryVaultNote = {
      id: `note_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      note: newNoteText.trim()
    };

    setNotes([newNote, ...notes]);
    setNewNoteText('');
  };

  const filteredNotes = notes.filter((n) =>
    n.note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="titanium-card p-6 space-y-6 font-sans text-[#ffffff] shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#22d3ee] flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-[#4f8cff]" />
            Investigator Case Notebook
          </span>
          <h3 className="text-base font-extrabold text-[#ffffff] mt-0.5">Hypotheses, Bookmarks & Case Notes</h3>
        </div>

        <span className="text-xs font-mono text-[#8b909b] font-bold">{notes.length} Notes Logged</span>
      </div>

      {/* Add New Note Input Form */}
      <form onSubmit={handleAddNote} className="flex gap-2">
        <input
          type="text"
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          placeholder="Log hypothesis, pinned finding, or follow-up question..."
          className="flex-1 input-titanium text-xs placeholder-[#8b909b]"
        />
        <button
          type="submit"
          className="btn-primary text-xs flex items-center gap-1.5 px-4"
        >
          <Plus className="h-4 w-4" /> Log Note
        </button>
      </form>

      {/* Search Filter Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-[#4f8cff]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter notebook by keyword..."
          className="w-full input-titanium text-xs pl-10 placeholder-[#8b909b]"
        />
      </div>

      {/* Logged Notes List */}
      <div className="space-y-3">
        {filteredNotes.length === 0 ? (
          <div className="p-6 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] text-center text-xs text-[#8b909b]">
            No investigator notes logged matching filter. Add a note above to record findings.
          </div>
        ) : (
          filteredNotes.map((n) => (
            <div key={n.id} className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#4f8cff] flex items-center gap-1">
                  <Pin className="h-3 w-3 text-[#22d3ee]" /> {n.timestamp}
                </span>
                <span className="text-[10px] font-mono text-[#8b909b] uppercase">Investigator Note</span>
              </div>
              <p className="text-[#c6c8d1] leading-relaxed text-xs font-medium">{n.note}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
