import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { api } from '../services/api';

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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      division: quoteModalDivision || 'General',
    }));
    setSuccess(false);
    setErrorMsg('');
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
      const res = await api.createEnquiry({
        ...formData,
        phone: cleanPhone,
        source: 'Quote Modal Popup',
      });

      if (res.success) {
        setSuccess(true);
      } else {
        setErrorMsg(res.message || 'Error submitting request.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit request.');
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
          onClick={closeQuoteModal}
          aria-label="Close quote modal"
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
            Executive Consultation
          </span>
          <h3 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '0.35rem' }}>
            Request a Project Consultation
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--muted)', margin: 0 }}>
            Connect with our leadership & engineering team. We respond within 24 business hours.
          </p>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={54} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Inquiry Received!</h4>
            <p style={{ color: 'var(--text)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Thank you for considering Anubhuti Group. Our representative will contact you shortly to schedule an initial feasibility discussion.
            </p>
            <button
              type="button"
              className="btn btn-primary"
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

