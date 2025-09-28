// src/components/dashboard/NotesList.tsx
import { useEffect, useState } from "react";
import { useNotesStore } from "@/store/notesStore";
import type { Note } from "@/types";
import NoteCard from "./NoteCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddNoteDialog from "./AddNoteDialog";
import EditNoteDialog from "./EditNoteDialog";
import ViewNoteDialog from "./ViewNoteDialog";

function NotesList() {
  const { notes, getAllNotes, getAllNotesLoading } = useNotesStore();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  // Close view dialog if the viewing note is deleted
  useEffect(() => {
    if (viewingNote && !notes.find(note => note._id === viewingNote._id)) {
      setViewingNote(null);
      setIsViewDialogOpen(false);
    }
  }, [notes, viewingNote]);

  // Reset deleting state when notes change
  useEffect(() => {
    if (deletingNoteId && !notes.find(note => note._id === deletingNoteId)) {
      setDeletingNoteId(null);
    }
  }, [notes, deletingNoteId]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Create Note Button */}
      <div className="flex justify-center mb-4 lg:mb-6">
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="w-[200px] flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4" /> Add Note
        </Button>
      </div>

      {getAllNotesLoading ? (
        <p className="text-center text-gray-500">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-center text-gray-400">No notes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note:Note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={(n) => {
                setEditingNote(n);
                setIsEditDialogOpen(true);
              }}
              onView={(n) => {
                // Only open view dialog if note exists and not currently deleting
                if (!notes.find(note => note._id === n._id) || deletingNoteId === n._id) return;
                setViewingNote(n);
                setIsViewDialogOpen(true);
              }}
              onDeleteStart={(id) => setDeletingNoteId(id)}
            />
          ))}
        </div>
      )}

      {/* Add Note Dialog */}
      <AddNoteDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      {/* Edit Note Dialog */}
      <EditNoteDialog
        open={isEditDialogOpen}
        onClose={() => {
          setEditingNote(null);
          setIsEditDialogOpen(false);
        }}
        note={editingNote}
      />

      {/* View Note Dialog */}
      <ViewNoteDialog
        open={isViewDialogOpen}
        onClose={() => {
          setViewingNote(null);
          setIsViewDialogOpen(false);
        }}
        note={viewingNote}
      />
    </div>
  );
}

export default NotesList;
