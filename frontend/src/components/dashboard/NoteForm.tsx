// src/components/dashboard/NoteForm.tsx
import { useState, useEffect } from "react";
import { useNotesStore } from "@/store/notesStore";
import type { Note } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface NoteFormProps {
  editingNote?: Note | null;
  onClose: () => void;
}

function NoteForm({ editingNote, onClose }: NoteFormProps) {
  const { addNote, updateNote, notesLoading } = useNotesStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNote) {
      await updateNote(editingNote._id, title, content);
    } else {
      await addNote(title, content);
      console.log("Add note ", title, content);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Title"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={notesLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={notesLoading}>
          {notesLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {editingNote ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  );
}

export default NoteForm;
