import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  intensity: string;
  durationMinutes: number;
  target: string;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true, unique: true },
  intensity: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  target: { type: String, required: true },
});

const WorkoutModel: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);

export default WorkoutModel;
