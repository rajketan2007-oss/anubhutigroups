import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    division: {
      type: String,
      enum: ['Construction', 'Interiors'],
      required: [true, 'Division is required'],
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required (e.g. Residential, Commercial, Industrial, Modular Kitchen, Living Room, etc.)'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    client: {
      type: String,
      default: 'Private Client',
    },
    year: {
      type: String,
      default: '2025',
    },
    area: {
      type: String,
      default: '12,000 sq.ft',
    },
    specs: [
      {
        type: String,
      },
    ],
    imageUrl: {
      type: String,
      required: [true, 'Project cover image is required'],
    },
    gallery: [
      {
        type: String,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    completionStatus: {
      type: String,
      enum: ['Completed', 'Ongoing', 'Upcoming'],
      default: 'Completed',
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;

