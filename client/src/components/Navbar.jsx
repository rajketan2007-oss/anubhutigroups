import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Menu, X, ArrowUpRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { openQuoteModal } = useModal();
  const location = useLocation();

  // Touch swipe tracking for mobile drawer
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    // If user swipes right by > 50px towards screen edge, close drawer
    if (touchCurrentX.current - touchStartX.current > 50 && touchStartX.current > 0) {
      setDrawerOpen(false);
    }
    touchStartX.current = 0;
    touchCurrentX.current = 0;
  };

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
              <a href="tel:+917908880693">+91 7908880693</a>
            </span>
            <span className="top-bar-item">
              <Mail size={13} color="var(--accent)" />
              <a href="mailto:anubhutigroup@gmail.com">anubhutigroup@gmail.com</a>
            </span>
            <span className="top-bar-item">
              <MapPin size={13} color="var(--accent)" />
              <span>Kolkata (Salt Lake Sector 5) • Durgapur (Sepco)</span>
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
      <aside
        className={`mobile-nav-drawer ${drawerOpen ? 'active' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mobile-drawer-header">
          <div className="brand-logo">
            <div className="brand-symbol" style={{ width: '38px', height: '38px', minWidth: '38px', minHeight: '38px', fontSize: '1.4rem', borderRadius: '8px' }}>A</div>
            <div className="brand-text">
              <span className="brand-title" style={{ fontSize: '1.15rem', whiteSpace: 'nowrap' }}>ANUBHUTI GROUP</span>
              <span className="brand-subtitle" style={{ fontSize: '0.6rem', whiteSpace: 'nowrap' }}>CONSTRUCTION • REALTOR • INTERIORS</span>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            style={{ position: 'static', width: '40px', height: '40px' }}
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation drawer"
          >
            <X size={20} />
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
              <span>{item.name}</span>
              <ArrowUpRight size={16} color="var(--accent)" />
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn btn-gold btn-lg"
            style={{ width: '100%', minHeight: '48px' }}
            onClick={() => {
              setDrawerOpen(false);
              openQuoteModal('General');
            }}
          >
            Request Project Consultation
          </button>

          {/* Quick Contact Touch Links */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.25rem' }}>
            <a
              href="tel:+917908880693"
              className="btn btn-soft btn-sm"
              style={{ minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.85rem' }}
            >
              <Phone size={15} color="var(--accent)" />
              <span>Call Us</span>
            </a>
            <a
              href="https://wa.me/917908880693?text=Hello%20Anubhuti%20Group%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noreferrer"
              className="btn btn-soft btn-sm"
              style={{ minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.85rem' }}
            >
              <MessageCircle size={15} color="var(--whatsapp)" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--muted)', textAlign: 'center', marginTop: '0.5rem' }}>
            Kolkata (Salt Lake Sec 5) • Durgapur (Sepco) • All Rights Reserved
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;

