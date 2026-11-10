import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import { isDBConnected } from '../config/db.js';
import { memoryStore } from '../utils/memoryStore.js';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'anubhuti_jwt_ultra_secure_secret_key_2026_luxury_group',
    {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    }
  );
};

// @desc    Authenticate Admin & get JWT token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email address and administrative password.',
      });
    }

    let admin = null;
    let isMatch = false;

    if (isDBConnected()) {
      admin = await Admin.findOne({ email: email.toLowerCase() });
      if (admin) {
        isMatch = await admin.matchPassword(password);
      }
    } else {
      admin = memoryStore.admins.find((a) => a.email === email.toLowerCase());
      if (admin) {
        isMatch = await bcrypt.compare(password, admin.password);
      }
    }

    if (!admin || !isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrative credentials. Access restricted.',
      });
    }

    const token = generateToken(admin._id);

    return res.status(200).json({
      success: true,
      message: 'Administrative authentication successful.',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during administrative authentication.',
      error: error.message,
    });
  }
};

// @desc    Get current logged in Admin
// @route   GET /api/auth/me
// @access  Private (Admin)
export const getAdminProfile = async (req, res) => {
  try {
    const admin = req.admin;
    return res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching administrative profile.',
    });
  }
};

