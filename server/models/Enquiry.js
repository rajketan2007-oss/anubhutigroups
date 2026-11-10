import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    division: {
      type: String,
      enum: ['General', 'Construction', 'Realtor', 'Interiors'],
      default: 'General',
    },
    projectType: {
      type: String,
      trim: true,
      default: 'General Consultation',
    },
    budget: {
      type: String,
      trim: true,
      default: 'Flexible / To be discussed',
    },
    message: {
      type: String,
      required: [true, 'Inquiry message is required'],
      trim: true,
      minlength: [5, 'Message must be at least 5 characters'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'In Progress', 'Resolved', 'Closed'],
      default: 'Pending',
    },
    source: {
      type: String,
      default: 'Website Direct',
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
export default Enquiry;

