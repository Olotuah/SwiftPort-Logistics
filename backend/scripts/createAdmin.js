// backend/scripts/createAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();
console.log('Seeding against:', process.env.MONGO_URI);   // ← add this

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to Mongo for seeding');
  const existing = await User.findOne({ username: 'owner' });
  console.log('Existing admin:', existing);
  if (existing) {
    console.log('Admin already exists');
    return process.exit();
  }
  const admin = new User({ username: 'owner', isAdmin: true });
  await admin.setPassword('My$uperSecret123');
  const saved = await admin.save();
  console.log('✅ Admin user created:', saved);           // ← log the document
  process.exit();
}

run().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
