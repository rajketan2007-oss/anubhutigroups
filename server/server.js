import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import { seedDatabaseIfEmpty } from './utils/autoSeed.js';
import authRoutes from './routes/authRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database (with seamless in-memory fallback)
connectDB().then((connected) => {
  if (connected) {
    seedDatabaseIfEmpty();
  }
});

// Security Middleware: Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(null, true); // Dev-friendly permissive CORS
    },
    credentials: true,
  })
);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting (General API)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Specific stricter limiter for Inquiry & Auth Submissions
const strictSubmissionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15,
  message: {
    success: false,
    message: 'Too many submissions. Please wait a moment before trying again.',
  },
});
app.use('/api/enquiries', strictSubmissionLimiter);
app.use('/api/auth/login', strictSubmissionLimiter);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Anubhuti Group API Server is operational',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.status(200).send(`
    <html>
      <head><title>Anubhuti Group API</title></head>
      <body style="font-family: sans-serif; background: #FAF7F2; color: #1F3D36; padding: 40px; text-align: center;">
        <h1 style="color: #1F3D36;">Anubhuti Group of Companies API Server</h1>
        <p style="color: #B8935A; font-weight: bold;">Building Trust. Creating Spaces. Delivering Dreams.</p>
        <p>API Status: Operational | <a href="/api/health" style="color: #1F3D36;">Check Health</a></p>
      </body>
    </html>
  `);
});

// 404 & Centralized Error Handling
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`✨ Anubhuti Group Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`🌐 Base URL: http://localhost:${PORT}`);
});

export default app;

