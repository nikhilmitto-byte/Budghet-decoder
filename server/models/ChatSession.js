import mongoose from 'mongoose';

const ChatSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  messages: [
    {
      role: { type: String, enum: ['user', 'model'], required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export const ChatSession = mongoose.model('ChatSession', ChatSessionSchema);
