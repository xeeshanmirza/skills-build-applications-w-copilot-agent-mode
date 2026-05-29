import mongoose, { Document, Schema } from "mongoose";

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  calories: number;
  date: Date;
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IActivity>("Activity", ActivitySchema);
