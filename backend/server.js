import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import packageRoutes from './routes/packages.js';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://swift-port-logistics.vercel.app",
      "https://swift-port-logistics-pf2icb83b-nelsons-projects-035bbaf1.vercel.app",
      "https://swift-port-logistics-pfgkab0al-nelsons-projects-035bbaf1.vercel.app",
      "https://swift-port-logistics-18a0zlfp2-nelsons-projects-035bbaf1.vercel.app/"

    ],
    credentials: true, // ✅ THIS must be set
    optionsSuccessStatus: 200
  })
);

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('🟢 Swift Port Logistics API is running');
});

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
