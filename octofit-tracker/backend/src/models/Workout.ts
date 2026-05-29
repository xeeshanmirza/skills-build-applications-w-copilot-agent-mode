import mongoose, { Document, Schema } from "mongoose";

export interface IWorkout extends Document {
  name: string;
  description: string;
  exercises: { name: string; sets: number; reps: number; duration?: number }[];
  createdAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      duration: { type: Number },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IWorkout>("Workout", WorkoutSchema);
