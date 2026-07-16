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
    email: { type: String, required: true },
    address: { type: String, required: true }
  },
  weight: { type: Number, required: true },
  service: { type: String, required: true },
  amount: { type: Number, default: 0 },
  paid: { type: Boolean, default: false },
  status: { type: String, default: 'Pending' },
  currentLocation: { type: String, default: '' },
  estimatedDelivery: { type: Date },
  carrier: { type: String, default: 'SwiftPort Logistics' },
  imageUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Package', packageSchema);
