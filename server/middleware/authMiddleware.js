import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { isDBConnected } from '../config/db.js';
import { memoryStore } from '../utils/memoryStore.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.adminToken) {
    token = req.cookies.adminToken;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Authentication token required for administrative access.',
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'anubhuti_jwt_ultra_secure_secret_key_2026_luxury_group'
    );

    if (isDBConnected()) {
      req.admin = await Admin.findById(decoded.id).select('-password');
    } else {
      req.admin = memoryStore.admins.find((a) => a._id === decoded.id);
    }

    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: 'The administrative account associated with this token is no longer valid.',
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired administrative token. Please log in again.',
    });
  }
};

