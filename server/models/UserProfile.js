import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // can use sessionId or auth id
  job: { type: String },
  salary: { type: Number },
  location: { type: String },
  matched_benefits: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export const UserProfile = mongoose.model('UserProfile', UserProfileSchema);
