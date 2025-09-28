// src/components/dashboard/EditNoteDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NoteForm from "./NoteForm";
import type { Note } from "@/types";

interface EditNoteDialogProps {
  open: boolean;
  onClose: () => void;
  note: Note | null;
}

function EditNoteDialog({ open, onClose, note }: EditNoteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
        </DialogHeader>
        {note && <NoteForm editingNote={note} onClose={onClose} />}
      </DialogContent>
    </Dialog>
  );
}

export default EditNoteDialog;
