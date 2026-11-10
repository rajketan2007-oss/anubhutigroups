import Testimonial from '../models/Testimonial.js';
import { isDBConnected } from '../config/db.js';
import { memoryStore } from '../utils/memoryStore.js';

// @desc    Get testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req, res) => {
  try {
    const { division } = req.query;

    if (isDBConnected()) {
      const query = { isApproved: true };
      if (division && division !== 'All') {
        query.$or = [{ division }, { division: 'Group' }];
      }

      const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: testimonials.length,
        data: testimonials,
      });
    } else {
      let results = memoryStore.testimonials.filter((t) => t.isApproved);
      if (division && division !== 'All') {
        results = results.filter((t) => t.division === division || t.division === 'Group');
      }
      return res.status(200).json({
        success: true,
        count: results.length,
        data: results,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve testimonials.',
      error: error.message,
    });
  }
};

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private (Admin)
export const createTestimonial = async (req, res) => {
  try {
    const body = req.body;
    let newTestimonial;

    if (isDBConnected()) {
      newTestimonial = await Testimonial.create(body);
    } else {
      newTestimonial = {
        _id: `test-${Date.now()}`,
        ...body,
        isApproved: body.isApproved !== undefined ? body.isApproved : true,
        createdAt: new Date(),
      };
      memoryStore.testimonials.unshift(newTestimonial);
    }

    return res.status(201).json({
      success: true,
      message: 'Testimonial created successfully.',
      data: newTestimonial,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Failed to create testimonial.',
      error: error.message,
    });
  }
};

