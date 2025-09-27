import mongoose, { Document, Schema } from "mongoose";

export interface IOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
  expiresAt: Date;
}

const OtpSchema: Schema = new Schema<IOtp>({
  email: { type: String, required: true, lowercase: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // auto delete after 5 min
  expiresAt: { type: Date, required: true },
});

const Otp = mongoose.model<IOtp>("Otp", OtpSchema);
export default Otp;
