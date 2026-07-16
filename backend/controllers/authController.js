// backend/controllers/authController.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

export const login = async (req, res) => {
  try {
    // 1️⃣ Log incoming credentials
    console.log('Login attempt:', req.body);

  // 2️⃣ Dump every username your server sees
   const allUsers = await User.find({}, 'username');
   console.log('🛠️  Users in DB:', allUsers.map(u => u.username));

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log('User found:', !!user, user);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    const valid = await user.validatePassword(password);
    console.log('Password valid?', valid);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    return res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
