import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    role: {
      type: String,
      default: 'Homeowner',
      trim: true,
    },
    company: {
      type: String,
      default: '',
      trim: true,
    },
    division: {
      type: String,
      enum: ['Construction', 'Realtor', 'Interiors', 'Group'],
      default: 'Group',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    comment: {
      type: String,
      required: [true, 'Testimonial comment is required'],
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    projectTitle: {
      type: String,
      default: 'Premium Turnkey Project',
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;

