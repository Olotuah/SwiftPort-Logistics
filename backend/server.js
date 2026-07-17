import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
import contactRoutes from "./routes/contact.js";
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

      // SwiftPort domains
      "https://www.swiftport.org",
      "https://swiftport.org",
      "https://www.swiftportlogistics.org",
      "https://swiftportlogistics.org",

      // Vercel previews
      "https://swift-port-logistics-pf2icb83b-nelsons-projects-035bbaf1.vercel.app",
      "https://swift-port-logistics-pfgkab0al-nelsons-projects-035bbaf1.vercel.app",
      "https://swift-port-logistics-18a0zlfp2-nelsons-projects-035bbaf1.vercel.app/"
    ],
    credentials: true,
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
app.use("/api/contact", contactRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    console.log('Database:', mongoose.connection.name);

    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error("❌ DB Connection Error FULL:");
    console.error(err);
  });