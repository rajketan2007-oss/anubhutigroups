import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || '123456789012345',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'abcdefghijklmnopqrstuvwxyz',
});

// Configure Multer storage
let upload;
try {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'anubhuti_group',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
      transformation: [{ width: 1920, height: 1080, crop: 'limit', quality: 'auto' }],
    },
  });
  upload = multer({ storage });
} catch (err) {
  // Local fallback storage in memory
  upload = multer({ storage: multer.memoryStorage() });
}

export { cloudinary, upload };

