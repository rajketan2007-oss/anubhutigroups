import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Property description is required'],
    },
    price: {
      type: String,
      required: [true, 'Price display string is required (e.g. ₹2.45 Cr or ₹45,000/mo)'],
    },
    priceNumeric: {
      type: Number,
      required: [true, 'Numeric price for filtering and sorting is required'],
      index: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      index: true,
    },
    city: {
      type: String,
      default: 'Delhi NCR',
      trim: true,
    },
    propertyType: {
      type: String,
      enum: ['Flat', 'Villa', 'Plot', 'Commercial'],
      required: [true, 'Property type is required'],
      index: true,
    },
    purpose: {
      type: String,
      enum: ['Buy', 'Rent'],
      default: 'Buy',
      index: true,
    },
    bhk: {
      type: String,
      default: '3 BHK',
      trim: true,
    },
    area: {
      type: String,
      required: [true, 'Area is required (e.g. 2,400 sq.ft)'],
    },
    areaNumeric: {
      type: Number,
      default: 1500,
    },
    bedrooms: {
      type: Number,
      default: 3,
    },
    bathrooms: {
      type: Number,
      default: 3,
    },
    features: [
      {
        type: String,
      },
    ],
    imageUrl: {
      type: String,
      required: [true, 'Primary image URL is required'],
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
    status: {
      type: String,
      enum: ['Available', 'Under Offer', 'Sold'],
      default: 'Available',
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
export default Property;

