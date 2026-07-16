import express from 'express';
import { login } from '../controllers/authController.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// 🔐 Login Route
router.post('/login', login);

// 🧪 TEMP: Seed Admin Route
router.get('/seed-admin', async (req, res) => {
  try {
    const existing = await User.findOne({ username: 'admin' });
    if (existing) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const user = new User({
      username: 'admin',
      password: hashedPassword,
    });

    await user.save();
    res.json({ message: 'Admin created successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error seeding admin user' });
  }
});

export default router;
