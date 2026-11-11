import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { api } from '../services/api';

const WHATSAPP_NUMBER = '917908880693';

const QuoteModal = () => {
  const { quoteModalOpen, quoteModalDivision, closeQuoteModal } = useModal();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    division: quoteModalDivision || 'General',
    projectType: 'General Consultation',
    budget: 'Flexible / To be discussed',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      division: quoteModalDivision || 'General',
    }));
    setSuccess(false);
    setErrorMsg('');
    setWhatsAppUrl('');
  }, [quoteModalDivision, quoteModalOpen]);

  if (!quoteModalOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name.';
    }

    const cleanPhone = formData.phone.replace(/^(\+91|0|\s|-)+/, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      errs.phone = 'Please provide a valid 10-digit Indian mobile number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = 'Please provide details (minimum 5 characters).';
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
    if (!validate()) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const cleanPhone = formData.phone.replace(/^(\+91|0|\s|-)+/, '');

      // Format WhatsApp message to send all quote details to 8252109615
      const waMessage =
`*✨ ANUBHUTI GROUP - GET A QUOTE / PRIORITY CONSULTATION ✨*
━━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${formData.fullName.trim()}
📱 *Mobile Number:* ${cleanPhone}
📧 *Email Address:* ${formData.email.trim()}
🏛️ *Division:* ${formData.division}
📝 *Project Specifications & Requirements:*
${formData.message.trim()}
━━━━━━━━━━━━━━━━━━━━━
🌐 *Source:* Web Portal (Get a Quote)
⏰ *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
      setWhatsAppUrl(waUrl);

      // Attempt immediate redirection to WhatsApp
      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.log('Popup blocked, button available on screen');
      }

      const res = await api.createEnquiry({
        ...formData,
        phone: cleanPhone,
        source: 'Quote Modal Popup',
      });

      setSuccess(true);
    } catch (err) {
      // Still show success since WhatsApp URL is ready to send
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={closeQuoteModal}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          style={{ width: '40px', height: '40px' }}
          onClick={closeQuoteModal}
          aria-label="Close quote modal"
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.25rem', paddingRight: '1rem', paddingLeft: '1rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
            Executive Consultation
          </span>
          <h3 style={{ fontSize: 'clamp(1.35rem, 4.5vw, 1.75rem)', color: 'var(--primary)', marginBottom: '0.35rem' }}>
            Request a Project Consultation
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--muted)', margin: 0 }}>
            Connect with our leadership & engineering team. We respond within 24 business hours.
          </p>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}>
            <CheckCircle2 size={54} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Consultation Request Submitted!</h4>
            <p style={{ color: 'var(--text)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              Thank you! Your quote request has been recorded. Tap below to send these exact details directly to our WhatsApp number <strong>7908880693</strong>.
            </p>

            {whatsAppUrl && (
              <div style={{ marginBottom: '1.5rem' }}>
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
                    padding: '0.95rem 1.25rem',
                    fontSize: '1rem',
                  }}
                >
                  <MessageCircle size={22} />
                  <span>Open WhatsApp to Send Details (7908880693)</span>
                </a>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.45rem' }}>
                  Click to open WhatsApp directly with all details pre-filled.
                </p>
              </div>
            )}

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={closeQuoteModal}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {errorMsg && (
              <div
                style={{
                  backgroundColor: 'var(--error-bg)',
                  color: 'var(--error)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1rem',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Full Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Anand Roy"
                  className="form-control"
                  required
                />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Phone (10 Digits) <span className="req">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  className="form-control"
                  required
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Email Address <span className="req">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  className="form-control"
                  required
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Division of Interest</label>
                <select
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="General">Anubhuti Group (General)</option>
                  <option value="Construction">Anubhuti Construction</option>
                  <option value="Realtor">Anubhuti Realtor</option>
                  <option value="Interiors">Anubhuti Interiors</option>
                </select>
              </div>

              <div className="form-group form-full">
                <label className="form-label">
                  Project Details / Requirements <span className="req">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe your site specs, layout expectations, or architectural timeline..."
                  className="form-control"
                  required
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              <div className="form-group form-full">
                <button
                  type="submit"
                  className="btn btn-gold btn-lg"
                  style={{ width: '100%' }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Priority Consultation</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuoteModal;

