import mongoose from 'mongoose';

let isConnected = false;
let fallbackMemoryMode = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('⚠️  MONGODB_URI not found in environment variables. Starting in resilient in-memory store mode.');
    fallbackMemoryMode = true;
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Fast fallback if local daemon not running
    });
    isConnected = true;
    fallbackMemoryMode = false;
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection failed (${error.message}).`);
    console.log('🔄 Seamlessly activating high-performance In-Memory Data Store for zero-downtime local development and demo.');
    fallbackMemoryMode = true;
    return false;
  }
};

export const isDBConnected = () => isConnected;
export const isFallbackMode = () => fallbackMemoryMode;

