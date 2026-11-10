import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { openQuoteModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Construction', path: '/construction' },
    { name: 'Realtor', path: '/realtor' },
    { name: 'Interiors', path: '/interiors' },
    { name: 'About & Contact', path: '/about-contact' },
  ];

  return (
    <>
      {/* Top Informational Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-contacts">
            <span className="top-bar-item">
              <Phone size={13} color="var(--accent)" />
              <a href="tel:+919876543210">+91 [98765 43210]</a>
            </span>
            <span className="top-bar-item">
              <Mail size={13} color="var(--accent)" />
              <a href="mailto:info@anubhutigroup.com">[info@anubhutigroup.com]</a>
            </span>
            <span className="top-bar-item">
              <MapPin size={13} color="var(--accent)" />
              <span>[Premier Business District, New Delhi / NCR]</span>
            </span>
          </div>
          <div className="top-bar-social">
            <span style={{ fontSize: '0.75rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={13} /> ISO 9001:2015 & RERA Compliant
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" aria-label="Anubhuti Group of Companies Home">
            <div className="brand-symbol">A</div>
            <div className="brand-text">
              <span className="brand-title">ANUBHUTI GROUP</span>
              <span className="brand-subtitle">CONSTRUCTION • REALTOR • INTERIORS</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="nav-actions">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => openQuoteModal('General')}
            >
              <span>Get a Quote</span>
              <ArrowUpRight size={15} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={`nav-toggle ${drawerOpen ? 'open' : ''}`}
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-nav-backdrop ${drawerOpen ? 'active' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile Drawer */}
      <aside className={`mobile-nav-drawer ${drawerOpen ? 'active' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="brand-logo">
            <div className="brand-symbol" style={{ width: '36px', height: '36px', fontSize: '1.3rem' }}>A</div>
            <div className="brand-text">
              <span className="brand-title" style={{ fontSize: '1.15rem' }}>ANUBHUTI GROUP</span>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            style={{ position: 'static' }}
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation drawer"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="mobile-menu-links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`}
              end={item.path === '/'}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <button
            type="button"
            className="btn btn-gold btn-lg"
            style={{ width: '100%' }}
            onClick={() => {
              setDrawerOpen(false);
              openQuoteModal('General');
            }}
          >
            Request Consultation
          </button>
          <div style={{ marginTop: '1.5rem', fontSize: '0.82rem', color: 'var(--muted)', textAlign: 'center' }}>
            Phone: +91 [98765 43210]<br />
            Email: [info@anubhutigroup.com]
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;

