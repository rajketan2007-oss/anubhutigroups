import React, { useState, useEffect } from 'react';
import {
  Search,
  Building,
  Home,
  LandPlot,
  Briefcase,
  ShieldCheck,
  FileText,
  BadgeIndianRupee,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Clock,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import PropertyCard from '../components/PropertyCard';
import FAQAccordion from '../components/FAQAccordion';
import ContactForm from '../components/ContactForm';
import Loader from '../components/Loader';
import { useModal } from '../context/ModalContext';
import { api } from '../services/api';

const Realtor = () => {
  const { openQuoteModal } = useModal();

  // Real Filter & Search States
  const [properties, setProperties] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Search Controls
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('All');
  const [searchPurpose, setSearchPurpose] = useState('All');
  const [searchSort, setSearchSort] = useState('newest');

  // Trigger search fetch
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 6,
        sort: searchSort,
      };
      if (searchLocation.trim()) params.location = searchLocation.trim();
      if (searchType !== 'All') params.propertyType = searchType;
      if (searchPurpose !== 'All') params.purpose = searchPurpose;

      const res = await api.getProperties(params);
      if (res.success) {
        setProperties(res.data);
        setTotal(res.total);
        setPages(res.pages);
      }
    } catch (err) {
      console.error('Property fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Anubhuti Realtor | Verified Luxury Real Estate & Wealth Advisory';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [page, searchType, searchPurpose, searchSort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProperties();
  };

  const realtorServices = [
    {
      icon: Home,
      title: 'Property Acquisition (Buy)',
      desc: 'Exclusive portfolio of certified freehold residential villas, penthouses, and luxury apartments with complete title checks.',
    },
    {
      icon: Building,
      title: 'Property Disposition (Sell)',
      desc: 'Institutional-grade asset marketing, high-net-worth buyer outreach, and maximum valuation realization for your real estate.',
    },
    {
      icon: Briefcase,
      title: 'Commercial Leasing',
      desc: 'Grade-A office floorplates, corporate headquarters leasing, high-street retail spaces, and industrial warehouse leases.',
    },
    {
      icon: BadgeIndianRupee,
      title: 'Property Valuation & Advisory',
      desc: 'Accredited market valuations, rental yield analysis, capital growth projections, and tax-efficient reinvestment planning.',
    },
    {
      icon: FileText,
      title: 'Legal Due Diligence & Registration',
      desc: 'Rigorous 30-year title searches, RERA compliance certification, municipal NOCs, and seamless sub-registrar deed execution.',
    },
    {
      icon: ShieldCheck,
      title: 'Home Loan Assistance',
      desc: 'Priority tie-ups with leading financial institutions (HDFC, SBI, ICICI, Axis) for preferred interest rates and rapid sanctions.',
    },
  ];

  const categoryCards = [
    {
      type: 'Villa',
      title: 'Independent Luxury Villas',
      count: 'Heritage Resort Enclaves',
      image: '/images/realtor/heritage-resort-villa-night.jpg',
    },
    {
      type: 'Plot',
      title: 'Residential Plots & Enclaves',
      count: 'Gated Freehold Land',
      image: '/images/realtor/resort-estate-aerial-pool.jpg',
    },
    {
      type: 'Commercial',
      title: 'Commercial & Retail',
      count: 'Offices & High-Street Tech Towers',
      image: '/images/construction/commercial-webel-tower.jpg',
    },
    {
      type: 'Flat',
      title: 'Luxury Flats & Penthouses',
      count: 'High-Rise Residences',
      image: '/images/construction/residential-green-enclave-render.jpg',
    },
  ];

  const faqs = [
    {
      question: 'When is Anubhuti Realtor launching its flagship projects?',
      answer:
        'Anubhuti Realtor is currently in its pre-launch phase for flagship resort villas, gated residential plots, and commercial suites in Kolkata (Salt Lake Sector 5) and Durgapur (Sepco). Pre-registered patrons receive exclusive priority pricing, preferred plot allocation, and VIP site visit invitations.',
    },
    {
      question: 'Are all upcoming properties RERA-registered and title-verified?',
      answer:
        'Yes. Anubhuti Realtor strictly deals in properties that have undergone our internal legal scrutiny. Every parcel undergoes 30-year chain title searches, encumbrance clearances, masterplan municipal sanctions, and RERA compliance before launch.',
    },
    {
      question: 'Can you assist non-resident Indians (NRIs) in acquiring property in West Bengal?',
      answer:
        'Yes, our NRI Wealth Advisory desk handles FEMA compliance, NRE/NRO account repatriations, power of attorney (PoA) documentation, and remote site visit walk-throughs via secure video link.',
    },
    {
      question: 'How do I pre-register or schedule an on-ground site visit?',
      answer:
        'You can submit the pre-registration form below, call our direct line at +91 7908880693, or message us on WhatsApp. Our regional desks in Kolkata (Salt Lake Sector 5) and Durgapur (Sepco) will coordinate your personalized tour.',
    },
  ];

  return (
    <div>
      {/* Page Hero */}
      <PageHero
        badge="Real Estate Division • Coming Soon"
        badgeClass="badge-gold"
        title="Anubhuti Realtor — Coming Soon"
        subtitle="Exclusive pre-launch portfolio of luxury heritage resort villas, gated freehold enclaves, and Grade-A commercial spaces across Kolkata (Salt Lake Sector 5) and Durgapur (Sepco). Pre-launch priority registration is now open."
        bgImage="/images/realtor/heritage-resort-villa-night.jpg"
        breadcrumbs={[{ name: 'Anubhuti Realtor (Coming Soon)', path: null }]}
      />

      {/* =========================================================================
          1. REAL SEARCH & FILTER CONTROLS (FUNCTIONAL BACKEND INTEGRATED)
          ========================================================================= */}
      <section
        style={{
          marginTop: 'clamp(-3rem, -2.5vw, -1.25rem)',
          position: 'relative',
          zIndex: 10,
          marginBottom: '2rem',
        }}
      >
        <div className="container">
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(1.25rem, 3.5vw, 2rem)',
              boxShadow: 'var(--shadow-xl)',
              border: '1.5px solid var(--border-accent)',
            }}
          >
            <form onSubmit={handleSearchSubmit}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                  gap: '1rem',
                  alignItems: 'flex-end',
                }}
              >
                {/* Location Search */}
                <div className="form-group">
                  <label className="form-label">Location / City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Kolkata, Salt Lake Sector 5, Durgapur, Sepco"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>

                {/* Property Type Filter */}
                <div className="form-group">
                  <label className="form-label">Property Type</label>
                  <select
                    className="form-control"
                    value={searchType}
                    onChange={(e) => {
                      setSearchType(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="All">All Types</option>
                    <option value="Flat">Flats & Apartments</option>
                    <option value="Villa">Luxury Villas</option>
                    <option value="Plot">Residential Plots</option>
                    <option value="Commercial">Commercial Offices</option>
                  </select>
                </div>

                {/* Purpose: Buy vs Rent */}
                <div className="form-group">
                  <label className="form-label">Purpose</label>
                  <select
                    className="form-control"
                    value={searchPurpose}
                    onChange={(e) => {
                      setSearchPurpose(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="All">Buy or Rent</option>
                    <option value="Buy">Buy (For Sale)</option>
                    <option value="Rent">Rent / Lease</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div className="form-group">
                  <label className="form-label">Sort By</label>
                  <select
                    className="form-control"
                    value={searchSort}
                    onChange={(e) => {
                      setSearchSort(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="newest">Newest Listed</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="area_desc">Largest Area</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="form-group">
                  <button type="submit" className="btn btn-gold btn-lg" style={{ width: '100%' }}>
                    <Search size={16} />
                    <span>Search Properties</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRE-LAUNCH EXCLUSIVE SHOWCASE (NEW REAL ESTATE VENTURES)
          ========================================================================= */}
      <section className="section section-white" style={{ paddingTop: '1rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <SectionHeading
            badge="Pre-Launch Priority Access"
            badgeClass="badge-gold"
            title="Anubhuti Realtor — Coming Soon to Kolkata & Durgapur"
            subtitle="Introducing our forthcoming flagship luxury resort estates and gated freehold communities. Pre-register today for early-bird pricing and VIP site visit priority."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem',
              marginBottom: '2.5rem',
            }}
          >
            {/* Showcase Card 1: Kolkata Heritage Villas */}
            <div
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: '1.5px solid var(--border-accent)',
              }}
            >
              <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
                <img
                  src="/images/realtor/heritage-resort-villa-night.jpg"
                  alt="The Anubhuti Heritage Oasis & Luxury Resort Villas - Kolkata"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <span
                  className="badge badge-gold"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    margin: 0,
                    backgroundColor: 'var(--accent)',
                    color: 'var(--primary)',
                    fontWeight: 800,
                  }}
                >
                  COMING SOON • PRE-LAUNCH
                </span>
                <span
                  className="badge badge-realtor"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    margin: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: 'var(--primary)',
                  }}
                >
                  Kolkata Hub
                </span>
              </div>
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.6rem' }}>
                  <MapPin size={15} color="var(--accent)" />
                  <span>Salt Lake Sector 5, Kolkata, West Bengal</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                  The Anubhuti Heritage Oasis & Luxury Resort Villas
                </h3>
                <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: 1.65, flex: 1, marginBottom: '1.25rem' }}>
                  A private enclave of bespoke heritage resort villas featuring classic colonial arches, ambient warm night illumination, private manicured courtyards, landscaped greens, and exclusive club access.
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span className="badge badge-soft">4 & 5 BHK Villas</span>
                  <span className="badge badge-soft">4,800 - 6,500 sq.ft</span>
                  <span className="badge badge-soft">Private Lawns</span>
                  <span className="badge badge-soft">24/7 Gated Security</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a
                    href="https://wa.me/917908880693?text=Hi%20Anubhuti%20Group,%20I%20am%20interested%20in%20pre-registering%20for%20The%20Anubhuti%20Heritage%20Resort%20Villas%20in%20Kolkata."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold btn-sm"
                    style={{ flex: 1, minWidth: '160px', justifyContent: 'center' }}
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Priority</span>
                  </a>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1, minWidth: '160px', borderColor: 'var(--primary)', justifyContent: 'center' }}
                    onClick={() => openQuoteModal('Realtor')}
                  >
                    <span>Pre-Register</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Showcase Card 2: Durgapur Resort Estate */}
            <div
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: '1.5px solid var(--border-accent)',
              }}
            >
              <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
                <img
                  src="/images/realtor/resort-estate-aerial-pool.jpg"
                  alt="The Grand Palm Resort Estate & Aquatic Enclave - Durgapur"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <span
                  className="badge badge-gold"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    margin: 0,
                    backgroundColor: 'var(--accent)',
                    color: 'var(--primary)',
                    fontWeight: 800,
                  }}
                >
                  COMING SOON • PRE-LAUNCH
                </span>
                <span
                  className="badge badge-realtor"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    margin: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: 'var(--primary)',
                  }}
                >
                  Durgapur Hub
                </span>
              </div>
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.6rem' }}>
                  <MapPin size={15} color="var(--accent)" />
                  <span>Sepco, Durgapur, West Bengal</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                  The Grand Palm Resort Estate & Aquatic Enclave
                </h3>
                <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: 1.65, flex: 1, marginBottom: '1.25rem' }}>
                  Masterplanned luxury gated township showcasing an Olympic-size azure swimming pool, poolside pavilion cabanas, illuminated botanical garden walkways, and freehold residential plots and villas.
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span className="badge badge-soft">Residential Plots & Villas</span>
                  <span className="badge badge-soft">3,200 - 7,500 sq.ft</span>
                  <span className="badge badge-soft">Olympic Azure Pool</span>
                  <span className="badge badge-soft">Clear Freehold Title</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a
                    href="https://wa.me/917908880693?text=Hi%20Anubhuti%20Group,%20I%20am%20interested%20in%20pre-registering%20for%20The%20Grand%20Palm%20Resort%20Estate%20in%20Durgapur."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold btn-sm"
                    style={{ flex: 1, minWidth: '160px', justifyContent: 'center' }}
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Priority</span>
                  </a>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1, minWidth: '160px', borderColor: 'var(--primary)', justifyContent: 'center' }}
                    onClick={() => openQuoteModal('Realtor')}
                  >
                    <span>Pre-Register</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Pre-Launch Advisory Strip */}
          <div
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.35rem' }}>
                <Clock size={18} color="var(--accent)" />
                <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Pre-Launch Advisory Desk Open
                </span>
              </div>
              <h4 style={{ color: 'var(--white)', fontSize: '1.35rem', margin: '0 0 0.35rem' }}>
                Want Early-Bird Plot Allocation or Brochure Preview?
              </h4>
              <p style={{ color: '#BAC7C1', fontSize: '0.92rem', margin: 0 }}>
                Speak directly with our senior real estate consultants across Kolkata and Durgapur.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="tel:+917908880693"
                className="btn btn-gold btn-md"
                style={{ textDecoration: 'none' }}
              >
                <Phone size={16} />
                <span>Call +91 7908880693</span>
              </a>
              <a
                href="mailto:anubhutigroup@gmail.com"
                className="btn btn-outline-white btn-md"
                style={{ textDecoration: 'none' }}
              >
                <Mail size={16} />
                <span>anubhutigroup@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PROPERTY LISTINGS SECTION (REAL DATA & PAGINATION)
          ========================================================================= */}
      <section className="section" id="listings">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span className="badge badge-realtor">Verified Properties</span>
              <h2 style={{ fontSize: '2rem', color: 'var(--primary)', margin: 0 }}>
                Exclusive Property Listings
              </h2>
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>
              Showing <strong>{properties.length}</strong> of <strong>{total}</strong> verified properties
            </div>
          </div>

          {loading ? (
            <Loader message="Fetching verified real estate listings from server..." />
          ) : properties.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
              }}
            >
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>No Matching Properties Found</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
                Try resetting your search query or location to explore our full luxury catalog.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSearchLocation('');
                  setSearchType('All');
                  setSearchPurpose('All');
                  setSearchSort('newest');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                  gap: '2rem',
                  marginBottom: '3rem',
                }}
              >
                {properties.map((prop) => (
                  <PropertyCard key={prop._id} property={prop} />
                ))}
              </div>

              {/* Real Backend Pagination */}
              {pages > 1 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                    marginTop: '2rem',
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-soft btn-sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </button>

                  <span style={{ fontSize: '0.92rem', color: 'var(--primary)', fontWeight: 600 }}>
                    Page {page} of {pages}
                  </span>

                  <button
                    type="button"
                    className="btn btn-soft btn-sm"
                    disabled={page >= pages}
                    onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* =========================================================================
          3. CATEGORIES QUICK SELECT CARDS
          ========================================================================= */}
      <section className="section section-white" id="categories">
        <div className="container">
          <SectionHeading
            badge="Asset Classes"
            title="Explore by Property Category"
            subtitle="Click on any asset class to filter listings immediately."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {categoryCards.map((cat, idx) => (
              <div
                key={idx}
                className="card"
                onClick={() => {
                  setSearchType(cat.type);
                  setPage(1);
                  const el = document.getElementById('listings');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '240px',
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'linear-gradient(to top, rgba(31, 61, 54, 0.9) 0%, rgba(31, 61, 54, 0.3) 60%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.5rem',
                    color: 'var(--white)',
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {cat.count}
                  </span>
                  <h4 style={{ color: 'var(--white)', margin: 0, fontSize: '1.25rem' }}>
                    {cat.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SIX REALTOR SERVICES
          ========================================================================= */}
      <section className="section" id="services">
        <div className="container">
          <SectionHeading
            badge="Full-Spectrum Advisory"
            title="End-to-End Real Estate Solutions"
            subtitle="Guiding families and institutional investors with utmost discretion, legal thoroughness, and market foresight."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {realtorServices.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="card"
                  style={{
                    padding: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'var(--surface)',
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--tint-realtor)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <IconComp size={26} color="var(--primary)" />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>
                    {srv.title}
                  </h3>
                  <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
                    {srv.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. WHY INVEST WITH US
          ========================================================================= */}
      <section className="section section-dark" id="why-invest">
        <div className="container">
          <SectionHeading
            badge="Investor Protection"
            badgeClass="badge-gold"
            title="Why Institutional Clients & Families Invest Through Us"
            subtitle="The Indian real estate landscape demands rigorous title certification, clear zoning knowledge, and disciplined valuation."
            dark={true}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <CheckCircle size={28} color="var(--accent)" style={{ marginBottom: '1rem' }} />
              <h4 style={{ color: 'var(--white)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Zero Title Ambiguity
              </h4>
              <p style={{ color: '#BAC7C1', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Every asset under Anubhuti Realtor is scrutinized by our retained high-court civil advocates with 30-year search reports.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <CheckCircle size={28} color="var(--accent)" style={{ marginBottom: '1rem' }} />
              <h4 style={{ color: 'var(--white)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Off-Market Exclusive Mandates
              </h4>
              <p style={{ color: '#BAC7C1', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Direct access to high-profile seller mandates and private commercial floorplates unavailable on public classified boards.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <CheckCircle size={28} color="var(--accent)" style={{ marginBottom: '1rem' }} />
              <h4 style={{ color: 'var(--white)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Capital Growth Advisory
              </h4>
              <p style={{ color: '#BAC7C1', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Data-driven micro-market appreciation studies ensuring strategic portfolio allocation with competitive rental yields.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FAQ ACCORDION
          ========================================================================= */}
      <section className="section" id="faq">
        <div className="container">
          <SectionHeading
            badge="Clarity & Due Diligence"
            title="Real Estate Acquisition FAQs"
            subtitle="Essential information regarding registration, legal vetting, and brokerage terms."
          />

          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* =========================================================================
          7. SITE VISIT & ENQUIRY FORM
          ========================================================================= */}
      <section className="section section-white" id="schedule-visit">
        <div className="container" style={{ maxWidth: '850px' }}>
          <SectionHeading
            badge="Exclusive Viewing"
            title="Schedule a Private Site Inspection"
            subtitle="Reserve a private viewing accompanied by our senior property investment director."
          />

          <ContactForm
            defaultDivision="Realtor"
            source="Realtor Site Visit Form"
            title="Schedule Property Viewing"
            subtitle="Let us know your preferred property, dates, and budget range for a coordinated tour."
          />
        </div>
      </section>
    </div>
  );
};

export default Realtor;

