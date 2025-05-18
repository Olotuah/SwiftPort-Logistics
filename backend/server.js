import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import packageRoutes from './routes/packages.js';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

// Allow requests only from your Vercel URL
app.use(
  cors({
    origin: process.env.FRONTEND_URL,  // e.g. https://my-swiftport.vercel.app
    optionsSuccessStatus: 200
  })
);
app.use('/uploads', express.static('uploads'));
app.use(express.json());

// Auth & package routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error('❌ DB Connection Error:', err.message));
