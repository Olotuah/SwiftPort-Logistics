// backend/controllers/packageController.js
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

// Public lookup
export const getPackage = async (req, res) => {
  try {
    const pkg = await Package.findOne({ trackingId: req.params.trackingId });
    if (!pkg) return res.status(404).json({ error: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Admin: delete a shipment by tracking ID
export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findOneAndDelete({ trackingId: req.params.trackingId });
    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json({ message: 'Package deleted successfully' });
  } catch (err) {
    console.error('Error deleting package:', err);
    res.status(500).json({ error: err.message });
  }
};

// Admin: list all shipments
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Admin: create new shipment
export const createPackage = async (req, res) => {
  try {
    const { sender, recipient, weight, service, paid = false, imageUrl } = req.body;
    const pkg = new Package({ sender, recipient, weight, service, paid, imageUrl });
    await pkg.save();

    const frontUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const trackLink = `${frontUrl}/track?trackingId=${pkg.trackingId}`;
    const messageText = `Your package (ID: ${pkg.trackingId}) has been created. Track here: ${trackLink}`;

    // Notify via SMS only
    if (recipient.phone) await sendSms(recipient.phone, messageText);

    res.status(201).json({ trackingId: pkg.trackingId });
  } catch (err) {
    console.error('Error creating package:', err);
    res.status(500).json({ error: err.message });
  }
};

// Admin: update shipment details
export const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findOne({ trackingId: req.params.trackingId });
    if (!pkg) return res.status(404).json({ error: 'Package not found' });

    const { status, paid } = req.body;
    if (status) pkg.status = status;
    if (typeof paid !== 'undefined') pkg.paid = paid === 'true' || paid === true;
    if (req.file) pkg.imageUrl = `/uploads/${req.file.filename}`;

    await pkg.save();

    const frontUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const trackLink = `${frontUrl}/track?trackingId=${pkg.trackingId}`;
    const updateText = `Update: Your package ${pkg.trackingId} status is now '${pkg.status}'.`;

    // Notify via SMS only
    if (pkg.recipient.phone) await sendSms(pkg.recipient.phone, updateText);

    res.json({ message: 'Package updated successfully', pkg });
  } catch (err) {
    console.error('Error updating package:', err);
    res.status(500).json({ error: err.message });
  }
};