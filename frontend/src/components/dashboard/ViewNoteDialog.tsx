import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import type { Note } from "@/types";

interface ViewNoteDialogProps {
  open: boolean;
  onClose: () => void;
  note: Note | null;
}

function ViewNoteDialog({ open, onClose, note }: ViewNoteDialogProps) {
  if (!note) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-3xl font-bold text-gray-800 leading-tight">
            {note.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Note Content */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 shadow-sm border">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">
                {note.content}
              </p>
            </div>
          </div>

          {/* Note Metadata */}
          <div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-600 bg-white rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <span className="font-medium text-gray-700">Created</span>
                <p className="text-gray-600">{format(new Date(note.createdAt), "EEEE, MMMM do, yyyy 'at' h:mm a")}</p>
              </div>
            </div>
            {note.updatedAt !== note.createdAt && (
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-green-500" />
                <div>
                  <span className="font-medium text-gray-700">Last Updated</span>
                  <p className="text-gray-600">{format(new Date(note.updatedAt), "EEEE, MMMM do, yyyy 'at' h:mm a")}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewNoteDialog;
