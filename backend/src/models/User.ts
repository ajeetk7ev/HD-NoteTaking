import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  dob: Date;
  notes:mongoose.Types.ObjectId[];
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    dob: { type: Date, required: true },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
    avatar: { type: String }, 
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
