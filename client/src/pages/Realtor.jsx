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
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import PropertyCard from '../components/PropertyCard';
import FAQAccordion from '../components/FAQAccordion';
import ContactForm from '../components/ContactForm';
import Loader from '../components/Loader';
import { api } from '../services/api';

const Realtor = () => {
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
      type: 'Flat',
      title: 'Luxury Flats & Penthouses',
      count: 'High-Rise Residences',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    },
    {
      type: 'Villa',
      title: 'Independent Villas',
      count: 'Private Enclaves',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80',
    },
    {
      type: 'Plot',
      title: 'Residential Plots',
      count: 'Gated Freehold Plots',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
    },
    {
      type: 'Commercial',
      title: 'Commercial & Retail',
      count: 'Offices & Showrooms',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const faqs = [
    {
      question: 'Are all listed properties RERA-registered and title-verified?',
      answer:
        'Yes. Anubhuti Realtor strictly lists properties that have undergone our internal legal scrutiny. We verify chain deeds, encumbrance certificates, development authority sanctions, and RERA registration numbers.',
    },
    {
      question: 'Can you assist non-resident Indians (NRIs) in buying property in India?',
      answer:
        'Yes, our NRI Wealth Advisory desk handles FEMA compliance, NRE/NRO account repatriations, power of attorney (PoA) documentation, and remote site visit walk-throughs via secure video link.',
    },
    {
      question: 'What are the typical brokerage or advisory charges?',
      answer:
        'Our standard advisory fees follow standard market regulations: 1% to 2% for outright sale/purchase transactions and one month’s equivalent rent for commercial/residential leases. Complete fee transparency is agreed upon upfront.',
    },
    {
      question: 'How do I schedule an on-ground physical site visit?',
      answer:
        'You can submit the site visit form below, contact our dedicated helpline, or click the WhatsApp button. A senior real estate consultant accompanied by a chauffeured private inspection vehicle will assist you.',
    },
  ];

  return (
    <div>
      {/* Page Hero */}
      <PageHero
        badge="Real Estate & Advisory Division"
        badgeClass="badge-realtor"
        title="Curated Premium Realty & Trusted Wealth Management"
        subtitle="Discover verified luxury residences, commercial office investments, and prime freehold plots backed by end-to-end legal title security."
        bgImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80"
        breadcrumbs={[{ name: 'Anubhuti Realtor', path: null }]}
      />

      {/* =========================================================================
          1. REAL SEARCH & FILTER CONTROLS (FUNCTIONAL BACKEND INTEGRATED)
          ========================================================================= */}
      <section
        style={{
          marginTop: '-3rem',
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
              padding: '2rem',
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
                    placeholder="e.g. Golf Course Road, Gurugram"
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

