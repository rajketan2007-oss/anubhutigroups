import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateEnquiry } from '../middleware/validateRequest.js';

const router = express.Router();

router.post('/', validateEnquiry, createEnquiry);
router.get('/', protect, getEnquiries);
router.patch('/:id', protect, updateEnquiryStatus);
router.delete('/:id', protect, deleteEnquiry);

export default router;

