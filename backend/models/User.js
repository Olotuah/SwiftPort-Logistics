// backend/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});

// Set & hash password
userSchema.methods.setPassword = async function(password) {
  this.passwordHash = await bcrypt.hash(password, 12);
};

// Validate password
userSchema.methods.validatePassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model('User', userSchema);
