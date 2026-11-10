import express from 'express';
import {
  getTestimonials,
  createTestimonial,
} from '../controllers/testimonialController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', protect, createTestimonial);

export default router;

