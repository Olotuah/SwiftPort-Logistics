// backend/models/Package.js
import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12);

const packageSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    unique: true,
    default: () => nanoid()
  },
  sender: {
    name: { type: String, required: true },
    phone: { type: String, required: true }
  },
  recipient: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },       // ← Added email field
    address: { type: String, required: true }
  },
  weight: { type: Number, required: true },
  service: { type: String, required: true },
  paid: { type: Boolean, default: false },
  status: { type: String, default: 'Pending' },
  imageUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Package', packageSchema);
