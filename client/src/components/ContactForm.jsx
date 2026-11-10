import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import { api } from '../services/api';

const WHATSAPP_NUMBER = '918252109615';

const ContactForm = ({
  defaultDivision = 'General',
  source = 'Contact Page Form',
  title = 'Send Us a Priority Inquiry',
  subtitle = 'Our executive team reviews every request and responds within 24 business hours.',
  buttonText = 'Submit Priority Consultation',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    division: defaultDivision,
    projectType: 'General Consultation',
    budget: 'Flexible / To be discussed',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const cleanPhone = formData.phone.replace(/^(\+91|0|\s|-)+/, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      errs.phone = 'Please provide a valid 10-digit Indian mobile number (e.g. 9876543210).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = 'Please provide a message with at least 5 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!validate()) return;

    setLoading(true);
    try {
      const cleanPhone = formData.phone.replace(/^(\+91|0|\s|-)+/, '');

      // Prepare formatted WhatsApp message
      const waMessage =
`*✨ ANUBHUTI GROUP - PRIORITY CONSULTATION ✨*
━━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${formData.fullName.trim()}
📱 *Mobile Number:* ${cleanPhone}
📧 *Email Address:* ${formData.email.trim()}
🏛️ *Division:* ${formData.division}
🏗️ *Requirement:* ${formData.projectType || 'General Consultation'}
💰 *Budget:* ${formData.budget || 'Flexible / To be discussed'}
📝 *Inquiry Details:*
${formData.message.trim()}
━━━━━━━━━━━━━━━━━━━━━
🌐 *Source:* ${source}
⏰ *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
      setWhatsAppUrl(waUrl);

      // Attempt to open WhatsApp immediately in new tab/app
      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.log('Direct popup prevented, on-screen WhatsApp action available');
      }

      // Persist to MongoDB backend (or mock fallback)
      const res = await api.createEnquiry({
        ...formData,
        phone: cleanPhone,
        source,
      });

      if (res.success) {
        setSuccessMsg(
          'Thank you! Your priority consultation details have been registered and WhatsApp has been initiated to send your request directly to 8252109615.'
        );
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          division: defaultDivision,
          projectType: 'General Consultation',
          budget: 'Flexible / To be discussed',
          message: '',
        });
      } else {
        // Even if DB fails, show success because WhatsApp message is ready
        setSuccessMsg(
          'Your consultation details are ready to send directly via WhatsApp to +91 8252109615.'
        );
      }
    } catch (err) {
      setSuccessMsg(
        'Your consultation details are prepared. Please tap the button below to send directly via WhatsApp.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(1.25rem, 4vw, 2.5rem)',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border)',
      }}
    >
      <div style={{ marginBottom: '1.75rem' }}>
        <h3 style={{ fontSize: '1.6rem', color: 'var(--primary)', marginBottom: '0.4rem' }}>
          {title}
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: 0 }}>
          {subtitle}
        </p>
      </div>

      {successMsg && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              backgroundColor: 'var(--success-bg)',
              color: 'var(--success)',
              border: '1px solid rgba(30, 130, 76, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.92rem',
            }}
          >
            <CheckCircle2 size={20} flexShrink={0} />
            <span>{successMsg}</span>
          </div>

          {whatsAppUrl && (
            <div
              style={{
                backgroundColor: 'rgba(37, 211, 102, 0.08)',
                border: '1.5px solid #25D366',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: '0 0 0.85rem 0', fontWeight: 600, color: 'var(--primary)', fontSize: '0.95rem' }}>
                Forward your project details directly to our WhatsApp executive:
              </p>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-lg"
                style={{
                  backgroundColor: '#25D366',
                  borderColor: '#25D366',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 16px rgba(37, 211, 102, 0.35)',
                  width: '100%',
                }}
              >
                <MessageCircle size={20} />
                <span>Open WhatsApp to Send Details (8252109615)</span>
              </a>
            </div>
          )}
        </div>
      )}

      {errorMsg && (
        <div
          style={{
            backgroundColor: 'var(--error-bg)',
            color: 'var(--error)',
            border: '1px solid rgba(192, 57, 43, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.92rem',
          }}
        >
          <AlertCircle size={20} flexShrink={0} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">
              Full Name <span className="req">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Ramesh Chandra"
              className="form-control"
              disabled={loading}
              required
            />
            {errors.fullName && <span className="form-error">{errors.fullName}</span>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label">
              Mobile Number (10 Digits) <span className="req">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              className="form-control"
              disabled={loading}
              required
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">
              Email Address <span className="req">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. ramesh@example.com"
              className="form-control"
              disabled={loading}
              required
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          {/* Division */}
          <div className="form-group">
            <label className="form-label">Division of Interest</label>
            <select
              name="division"
              value={formData.division}
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            >
              <option value="General">Anubhuti Group (General Inquiry)</option>
              <option value="Construction">Anubhuti Construction</option>
              <option value="Realtor">Anubhuti Realtor</option>
              <option value="Interiors">Anubhuti Interiors</option>
            </select>
          </div>

          {/* Project Type */}
          <div className="form-group">
            <label className="form-label">Requirement Type</label>
            <input
              type="text"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              placeholder="e.g. 4 BHK Villa / Office Turnkey"
              className="form-control"
              disabled={loading}
            />
          </div>

          {/* Budget */}
          <div className="form-group">
            <label className="form-label">Estimated Budget</label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            >
              <option value="Flexible / To be discussed">Flexible / To be discussed</option>
              <option value="₹25 Lac - ₹50 Lac">₹25 Lac - ₹50 Lac</option>
              <option value="₹50 Lac - ₹1 Cr">₹50 Lac - ₹1 Cr</option>
              <option value="₹1 Cr - ₹3 Cr">₹1 Cr - ₹3 Cr</option>
              <option value="₹3 Cr - ₹10 Cr">₹3 Cr - ₹10 Cr</option>
              <option value="₹10 Cr+ Premium">₹10 Cr+ Ultra Premium</option>
            </select>
          </div>

          {/* Message */}
          <div className="form-group form-full">
            <label className="form-label">
              Inquiry / Project Details <span className="req">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your site location, plot dimensions, expected handover date or design preferences..."
              className="form-control"
              disabled={loading}
              required
            />
            {errors.message && <span className="form-error">{errors.message}</span>}
          </div>

          {/* Submit CTA */}
          <div className="form-group form-full" style={{ marginTop: '0.5rem' }}>
            <button
              type="submit"
              className="btn btn-gold btn-lg"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>{buttonText}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

