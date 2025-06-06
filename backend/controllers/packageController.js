import Package from '../models/Package.js';
import Twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

// Configure Twilio SMS
const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Helper: send SMS to recipient
async function sendSms(to, message) {
  if (!process.env.TWILIO_FROM) return;
  try {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_FROM,
      to
    });
    console.log(`SMS sent to ${to}`);
  } catch (err) {
    console.error('Error sending SMS:', err);
  }
}

// Public: Get package by tracking ID
export const getPackage = async (req, res) => {
  try {
    const tracking = req.params.trackingId.trim();
    const pkg = await Package.findOne({ trackingId: new RegExp(`^${tracking}$`, 'i') });
    if (!pkg) return res.status(404).json({ error: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    console.error('Error fetching package:', err);
    res.status(500).json({ error: err.message });
  }
};

// Admin: Delete a package
export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findOneAndDelete({ trackingId: req.params.trackingId });
    if (!pkg) return res.status(404).json({ error: 'Package not found' });
    res.json({ message: 'Package deleted successfully' });
  } catch (err) {
    console.error('Error deleting package:', err);
    res.status(500).json({ error: err.message });
  }
};

// Admin: Get all packages
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Admin: Create a new package
export const createPackage = async (req, res) => {
  try {
    const {
      sender,
      recipient,
      weight,
      service,
      paid = false,
      currentLocation = '',
      estimatedDelivery,
      carrier = 'SwiftPort Logistics'
    } = req.body;

    const imageUrl = req.file ? req.file.path : '';

    const pkg = new Package({
      sender,
      recipient,
      weight,
      service,
      paid,
      imageUrl,
      currentLocation,
      estimatedDelivery,
      carrier
    });

    await pkg.save();

    const frontUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const trackLink = `${frontUrl}/track?trackingId=${pkg.trackingId}`;
    const messageText = `Your package (ID: ${pkg.trackingId}) has been created. Track here: ${trackLink}`;

    if (recipient.phone) await sendSms(recipient.phone, messageText);

    res.status(201).json({ trackingId: pkg.trackingId });
  } catch (err) {
    console.error('Error creating package:', err);
    res.status(500).json({ error: err.message });
  }
};

// Admin: Update package
export const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findOne({ trackingId: req.params.trackingId });
    if (!pkg) return res.status(404).json({ error: 'Package not found' });

    const {
      status,
      paid,
      currentLocation,
      estimatedDelivery,
      carrier,
      amount
    } = req.body;

    if (status) pkg.status = status;
    if (typeof paid !== 'undefined') pkg.paid = paid === 'true' || paid === true;
    if (currentLocation) pkg.currentLocation = currentLocation;
    if (estimatedDelivery) pkg.estimatedDelivery = new Date(estimatedDelivery);
    if (amount) pkg.amount = parseFloat(amount);
    if (carrier) pkg.carrier = carrier;

    pkg.updatedAt = new Date();

    if (req.file) {
      pkg.imageUrl = req.file.path;
      console.log('✅ Updated image URL:', req.file.path);
    }

    await pkg.save();

    const frontUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const trackLink = `${frontUrl}/track?trackingId=${pkg.trackingId}`;
    const updateText = `Update: Your package ${pkg.trackingId} status is now '${pkg.status}'.`;

    if (pkg.recipient.phone) await sendSms(pkg.recipient.phone, updateText);

    res.json({ message: 'Package updated successfully', pkg });
  } catch (err) {
    console.error('Error updating package:', err);
    res.status(500).json({ error: err.message });
  }
};
