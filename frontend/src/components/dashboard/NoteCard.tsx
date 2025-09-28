// src/components/dashboard/NoteCard.tsx
import { useNotesStore } from "@/store/notesStore";
import { Trash2, Edit3, Loader2, Eye } from "lucide-react";
import { format } from "date-fns";
import type { Note } from "@/types";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onView: (note: Note) => void;
  onDeleteStart?: (id: string) => void;
}

function NoteCard({ note, onEdit, onView, onDeleteStart }: NoteCardProps) {
  const { deleteNote, notesLoading } = useNotesStore();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleView = () => {
    // Don't open view dialog if delete modal is open
    if (!isDeleteOpen) {
      onView(note);
    }
  };

  const handleDelete = async () => {
    onDeleteStart?.(note._id);
    await deleteNote(note._id);
    setIsDeleteOpen(false);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition duration-200 cursor-pointer"
      onClick={handleView}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">{note.content}</p>
        </div>
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleView}
            className="text-blue-600"
          >
            <Eye className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(note)}
            className="text-indigo-600"
          >
            <Edit3 className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDeleteOpen(true)}
            className="text-red-600"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">
        Created: {format(new Date(note.createdAt), "dd MMM yyyy, hh:mm a")}
      </p>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this note?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={notesLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={notesLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {notesLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default NoteCard;
