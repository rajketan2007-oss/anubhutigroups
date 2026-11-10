// Validation middleware for incoming inquiries and submissions
export const validateEnquiry = (req, res, next) => {
  const { fullName, phone, email, message } = req.body;

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid full name (minimum 2 characters).',
    });
  }

  // Indian 10-digit mobile number validation (optional leading +91 or 0)
  const cleanPhone = String(phone).replace(/^(\+91|0|\s|-)+/, '');
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phone || !phoneRegex.test(cleanPhone)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid 10-digit Indian mobile number (e.g., 9876543210).',
    });
  }
  // Store cleaned phone
  req.body.phone = cleanPhone;

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return res.status(400).json({
      success: false,
      message: 'Inquiry message must contain at least 5 characters.',
    });
  }

  next();
};

