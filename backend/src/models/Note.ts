import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
  userId: mongoose.Types.ObjectId; // reference to User
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: Schema = new Schema<INote>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Note = mongoose.model<INote>("Note", NoteSchema);
export default Note;
