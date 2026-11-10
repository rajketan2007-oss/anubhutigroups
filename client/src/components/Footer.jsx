import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const Footer = () => {
  const { openQuoteModal } = useModal();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-col">
            <div className="brand-logo" style={{ marginBottom: '1.25rem' }}>
              <div className="brand-symbol" style={{ borderColor: 'rgba(184, 147, 90, 0.6)' }}>A</div>
              <div className="brand-text">
                <span className="brand-title" style={{ color: 'var(--white)' }}>ANUBHUTI GROUP</span>
                <span className="brand-subtitle">BUILDING TRUST. CREATING SPACES.</span>
              </div>
            </div>
            <p style={{ color: '#BAC7C1', fontSize: '0.92rem', maxWidth: '380px' }}>
              Anubhuti Group of Companies is a premier Indian infrastructure conglomerate. Delivering architectural construction, luxury realty consulting, and turnkey bespoke interior design.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1.25rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#BAC7C1' }}>
                <Phone size={15} color="var(--accent)" />
                <a href="tel:+918252109615" style={{ color: '#BAC7C1' }}>+91 8252109615</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#BAC7C1' }}>
                <Mail size={15} color="var(--accent)" />
                <a href="mailto:info@anubhutigroup.com" style={{ color: '#BAC7C1' }}>[info@anubhutigroup.com]</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#BAC7C1' }}>
                <MapPin size={15} color="var(--accent)" />
                <span>[Anubhuti Corporate Tower, Level 8, Business Boulevard, NCR, India]</span>
              </div>
            </div>
          </div>

          {/* Division Links */}
          <div className="footer-col">
            <h4>Business Divisions</h4>
            <div className="footer-links">
              <Link to="/construction">Anubhuti Construction</Link>
              <Link to="/construction#services">• Residential Construction</Link>
              <Link to="/construction#services">• Commercial Towers</Link>
              <Link to="/realtor">Anubhuti Realtor</Link>
              <Link to="/realtor#listings">• Luxury Flats & Villas</Link>
              <Link to="/realtor#listings">• Commercial Lease & Sale</Link>
              <Link to="/interiors">Anubhuti Interiors</Link>
              <Link to="/interiors#services">• Modular Kitchens</Link>
              <Link to="/interiors#services">• Turnkey Residences</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Corporate Info</h4>
            <div className="footer-links">
              <Link to="/about-contact">About Anubhuti Group</Link>
              <Link to="/about-contact#story">Our Vision & Mission</Link>
              <Link to="/about-contact#leadership">Leadership Team</Link>
              <Link to="/about-contact#milestones">Company Milestones</Link>
              <Link to="/about-contact#contact">Branch Locations</Link>
              <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Lock size={12} color="var(--accent)" /> Admin Portal
              </Link>
            </div>
          </div>

          {/* Priority Callback / Action */}
          <div className="footer-col">
            <h4>Priority Consultation</h4>
            <p style={{ color: '#BAC7C1', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Connect with our senior technical advisors for civil feasibility, site valuations, or turnkey 3D design quotes.
            </p>
            <button
              type="button"
              className="btn btn-gold btn-lg"
              style={{ width: '100%' }}
              onClick={() => openQuoteModal('General')}
            >
              <span>Schedule Consultation</span>
              <ArrowRight size={16} />
            </button>
            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontSize: '0.8rem' }}>
              <ShieldCheck size={16} />
              <span>Verified Client Protection Guarantee</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Anubhuti Group of Companies. All Rights Reserved.
          </div>
          <div className="footer-bottom-links">
            <Link to="/about-contact">Privacy Policy</Link>
            <Link to="/about-contact">Terms of Service</Link>
            <Link to="/about-contact">RERA Compliance [Placeholder]</Link>
            <a href="/sitemap.xml" target="_blank" rel="noreferrer">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

