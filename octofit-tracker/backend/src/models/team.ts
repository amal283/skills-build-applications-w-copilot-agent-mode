import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: number;
  captain: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  sport: { type: String, required: true },
  members: { type: Number, required: true },
  captain: { type: String, required: true },
});

const TeamModel: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);

export default TeamModel;
