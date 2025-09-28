
import { AlertCircle } from "lucide-react";

function EmailNote() {
  return (
    <div className="flex flex-col h-fit mb-2 items-center text-center p-4 rounded-2xl bg-blue-50 border border-blue-200 shadow-sm">
      
      <p className="text-sm text-gray-600 mt-1">
        Please check your inbox.  
        Sometimes the email might land in the{" "}
        <span className="font-medium text-red-600">Spam</span> folder.
      </p>
      <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
        <AlertCircle className="w-4 h-4" />
        <span>If you don’t see it, wait a minute and try again.</span>
      </div>
    </div>
  );
}

export default EmailNote;
