// src/components/dashboard/AddNoteDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NoteForm from "./NoteForm";

interface AddNoteDialogProps {
  open: boolean;
  onClose: () => void;
}

function AddNoteDialog({ open, onClose }: AddNoteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Note</DialogTitle>
        </DialogHeader>
        <NoteForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

export default AddNoteDialog;
