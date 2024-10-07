import mongoose, { Schema, Document } from 'mongoose';

interface ISession extends Document {
  clientName: string;
  date: Date;
  status: string;
  notes?: string;
}

const sessionSchema: Schema = new Schema({
  clientName: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], required: true },
  notes: { type: String }
});

export const Session = mongoose.model<ISession>('Session', sessionSchema);
