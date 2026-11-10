import Enquiry from '../models/Enquiry.js';
import { isDBConnected } from '../config/db.js';
import { memoryStore } from '../utils/memoryStore.js';
import { sendEnquiryNotification } from '../utils/emailService.js';

// @desc    Submit a new enquiry
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = async (req, res) => {
  try {
    const { fullName, phone, email, division, projectType, budget, message, source } = req.body;

    const enquiryData = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      division: division || 'General',
      projectType: projectType || 'General Consultation',
      budget: budget || 'Flexible',
      message: message.trim(),
      source: source || 'Website Consultation Form',
      status: 'Pending',
      createdAt: new Date(),
    };

    let savedEnquiry;

    if (isDBConnected()) {
      savedEnquiry = await Enquiry.create(enquiryData);
    } else {
      enquiryData._id = `enq-${Date.now()}`;
      memoryStore.enquiries.unshift(enquiryData);
      savedEnquiry = enquiryData;
    }

    // Trigger async email notification
    sendEnquiryNotification(savedEnquiry).catch((err) =>
      console.error('Email alert dispatch error:', err)
    );

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received with priority. Our executive team will connect with you within 24 business hours.',
      data: savedEnquiry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry. Please try again or reach us directly on WhatsApp.',
      error: error.message,
    });
  }
};

// @desc    Get all enquiries (with filtering, pagination & status search)
// @route   GET /api/enquiries
// @access  Private (Admin)
export const getEnquiries = async (req, res) => {
  try {
    const { division, status, search, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isDBConnected()) {
      const query = {};
      if (division && division !== 'All') query.division = division;
      if (status && status !== 'All') query.status = status;
      if (search) {
        query.$or = [
          { fullName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { message: { $regex: search, $options: 'i' } },
        ];
      }

      const total = await Enquiry.countDocuments(query);
      const enquiries = await Enquiry.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      return res.status(200).json({
        success: true,
        count: enquiries.length,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        data: enquiries,
      });
    } else {
      // In-Memory store filtering
      let results = [...memoryStore.enquiries];

      if (division && division !== 'All') {
        results = results.filter((e) => e.division === division);
      }
      if (status && status !== 'All') {
        results = results.filter((e) => e.status === status);
      }
      if (search) {
        const term = search.toLowerCase();
        results = results.filter(
          (e) =>
            e.fullName.toLowerCase().includes(term) ||
            e.email.toLowerCase().includes(term) ||
            e.phone.includes(term) ||
            e.message.toLowerCase().includes(term)
        );
      }

      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const total = results.length;
      const paginated = results.slice((pageNum - 1) * limitNum, pageNum * limitNum);

      return res.status(200).json({
        success: true,
        count: paginated.length,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        data: paginated,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve inquiries.',
      error: error.message,
    });
  }
};

// @desc    Update enquiry status
// @route   PATCH /api/enquiries/:id
// @access  Private (Admin)
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!['Pending', 'Contacted', 'In Progress', 'Resolved', 'Closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value provided.',
      });
    }

    if (isDBConnected()) {
      const enquiry = await Enquiry.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );
      if (!enquiry) {
        return res.status(404).json({ success: false, message: 'Inquiry record not found.' });
      }
      return res.status(200).json({ success: true, data: enquiry });
    } else {
      const enquiry = memoryStore.enquiries.find((e) => String(e._id) === String(id));
      if (!enquiry) {
        return res.status(404).json({ success: false, message: 'Inquiry record not found.' });
      }
      enquiry.status = status;
      enquiry.updatedAt = new Date();
      return res.status(200).json({ success: true, data: enquiry });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating inquiry status.',
      error: error.message,
    });
  }
};

// @desc    Delete an enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDBConnected()) {
      const enquiry = await Enquiry.findByIdAndDelete(id);
      if (!enquiry) {
        return res.status(404).json({ success: false, message: 'Inquiry not found.' });
      }
    } else {
      const idx = memoryStore.enquiries.findIndex((e) => String(e._id) === String(id));
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Inquiry not found.' });
      }
      memoryStore.enquiries.splice(idx, 1);
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry record deleted successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting inquiry.',
      error: error.message,
    });
  }
};

