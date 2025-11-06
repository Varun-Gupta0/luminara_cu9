import mongoose, { Document, Schema } from 'mongoose';

export interface IFarmer extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  farmName?: string;
  location?: string;
  createdAt: Date;
}

const FarmerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String },
  farmName: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IFarmer>('Farmer', FarmerSchema);