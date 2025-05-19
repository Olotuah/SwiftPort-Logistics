// backend/routes/packages.js
import express from 'express';
import multer from 'multer';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import {
  getPackage,
  getAllPackages,
  createPackage,
  updatePackage,
  deletePackage
} from '../controllers/packageController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// ─── Admin-only ────────────────────────────────────────────────────────────────
// List all packages
router.get('/all', authenticate, requireAdmin, getAllPackages);

// Create a new shipment
router.post('/', authenticate, requireAdmin, upload.single('image'), createPackage);

// Update a shipment
router.put('/:trackingId', authenticate, requireAdmin, upload.single('image'), updatePackage);

// Delete a shipment
router.delete('/:trackingId', authenticate, requireAdmin, deletePackage);

// Public tracking route
router.get('/track/:trackingId', getPackage);

// ─── Public ────────────────────────────────────────────────────────────────────
// Fetch a single package by tracking ID
router.get('/:trackingId', getPackage);


export default router;
