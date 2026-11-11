import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HardHat,
  Building2,
  Paintbrush,
  ArrowRight,
  Shield,
  Award,
  Clock,
  CheckCircle,
  Users,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import TestimonialSlider from '../components/TestimonialSlider';
import { useModal } from '../context/ModalContext';
import { api } from '../services/api';

const Home = () => {
  const { openQuoteModal } = useModal();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Counter animation state
  const [counts, setCounts] = useState({ years: 0, projects: 0, clients: 0, cities: 0 });

  useEffect(() => {
    document.title = 'Anubhuti Group of Companies | Building Trust. Creating Spaces. Delivering Dreams.';

    const fetchData = async () => {
      try {
        const [projRes, testRes] = await Promise.all([
          api.getProjects({ limit: 6, featured: 'true' }),
          api.getTestimonials({}),
        ]);
        if (projRes.success) setFeaturedProjects(projRes.data);
        if (testRes.success) setTestimonials(testRes.data);
      } catch (err) {
        console.error('Data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Stats counter animation
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        years: Math.round(18 * ease),
        projects: Math.round(350 * ease),
        clients: Math.round(2400 * ease),
        cities: Math.round(12 * ease),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* =========================================================================
          1. FULL-SCREEN LUXURY HERO
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--primary)',
          color: 'var(--white)',
          padding: 'clamp(3.5rem, 7vw, 6rem) 0',
          overflow: 'hidden',
        }}
      >
        {/* Architectural Image & Gradient Background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(135deg, rgba(31, 61, 54, 0.95) 0%, rgba(31, 61, 54, 0.82) 50%, rgba(184, 147, 90, 0.3) 100%), url('https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1920&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '880px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '1.25rem' }}>
              Premier Indian Infrastructure Conglomerate
            </span>

            <h1
              style={{
                color: 'var(--white)',
                fontSize: 'clamp(2.7rem, 5.5vw, 4.4rem)',
                lineHeight: 1.12,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
              }}
            >
              Building Trust. <br />
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Creating Spaces.</span> <br />
              Delivering Dreams.
            </h1>

            <p
              style={{
                color: '#D1DAD5',
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                lineHeight: 1.65,
                marginBottom: '2.5rem',
                maxWidth: '720px',
              }}
            >
              Anubhuti Group of Companies integrates three industry-leading verticals—
              <strong> Anubhuti Construction</strong>, <strong>Anubhuti Realtor</strong>, and{' '}
              <strong>Anubhuti Interiors</strong>. Delivering landmark civil infrastructure, verified premium real estate, and bespoke turnkey interior spaces.
            </p>

            <div className="hero-cta-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                type="button"
                className="btn btn-gold btn-lg"
                onClick={() => openQuoteModal('General')}
              >
                <span>Request a Consultation</span>
                <ArrowRight size={18} />
              </button>

              <a href="#divisions" className="btn btn-outline-white btn-lg">
                <span>Explore Divisions</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THREE BUSINESS DIVISIONS
          ========================================================================= */}
      <section className="section" id="divisions">
        <div className="container">
          <SectionHeading
            badge="Corporate Architecture"
            title="Three Pillars of Comprehensive Excellence"
            subtitle="From the foundational excavation to certified legal registration and curated turnkey interiors, Anubhuti Group provides end-to-end solutions under one trusted umbrella."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Division 1: Construction */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/images/construction/commercial-glass-facade-tower.jpg"
                  alt="Anubhuti Construction"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="badge badge-construction" style={{ position: 'absolute', top: '1rem', left: '1rem', margin: 0 }}>
                  Civil & Structural
                </span>
              </div>
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.85rem' }}>
                  <HardHat size={26} color="var(--accent)" />
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>
                    Anubhuti Construction
                  </h3>
                </div>
                <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: 1.65, flex: 1 }}>
                  High-specification residential, commercial, industrial and infrastructure construction. Engineered with seismic safety, precision RCC civil works, and strict timeline adherence.
                </p>
                <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <Link
                    to="/construction"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--primary)',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                    }}
                  >
                    <span>Explore Construction Services</span>
                    <ArrowRight size={16} color="var(--accent)" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Division 2: Realtor */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/images/realtor/heritage-resort-villa-night.jpg"
                  alt="Anubhuti Realtor - Luxury Heritage Resort Villa"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="badge badge-realtor" style={{ position: 'absolute', top: '1rem', left: '1rem', margin: 0 }}>
                  Real Estate Advisory
                </span>
                <span
                  className="badge badge-gold"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    margin: 0,
                    backgroundColor: 'var(--accent)',
                    color: 'var(--primary)',
                    fontWeight: 800,
                  }}
                >
                  Coming Soon
                </span>
              </div>
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.85rem' }}>
                  <Building2 size={26} color="var(--primary)" />
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>
                    Anubhuti Realtor
                  </h3>
                </div>
                <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: 1.65, flex: 1 }}>
                  <strong>Coming Soon!</strong> Strategic property brokerage and luxury estate development. Featuring verified heritage resort villas, gated enclaves, and Grade-A commercial assets across Kolkata (Salt Lake Sector 5) and Durgapur (Sepco). Pre-launch consultations now open.
                </p>
                <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <Link
                    to="/realtor"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--primary)',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                    }}
                  >
                    <span>Explore Realtor Pre-Launch</span>
                    <ArrowRight size={16} color="var(--accent)" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Division 3: Interiors */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/images/interiors/grand-atrium-lobby.jpg"
                  alt="Anubhuti Interiors"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="badge badge-interiors" style={{ position: 'absolute', top: '1rem', left: '1rem', margin: 0 }}>
                  Turnkey Execution
                </span>
              </div>
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.85rem' }}>
                  <Paintbrush size={26} color="var(--accent)" />
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>
                    Anubhuti Interiors
                  </h3>
                </div>
                <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: 1.65, flex: 1 }}>
                  Turnkey residential and commercial interior architectural design. Crafted with modular German fittings, imported Italian marbles, acoustic millwork, and custom lighting.
                </p>
                <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <Link
                    to="/interiors"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--primary)',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                    }}
                  >
                    <span>View Interior Portfolio</span>
                    <ArrowRight size={16} color="var(--accent)" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. ANIMATED STATISTICS COUNTER STRIP
          ========================================================================= */}
      <section
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--white)',
          padding: '4.5rem 0',
          position: 'relative',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2.5rem',
              textAlign: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 4vw, 3.8rem)',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--accent)',
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}
              >
                {counts.years}+
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--white)', marginBottom: '0.2rem' }}>
                Years of Mastery
              </div>
              <div style={{ fontSize: '0.82rem', color: '#B4C0BA' }}>
                Proven civil execution [Sample metric]
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 4vw, 3.8rem)',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--accent)',
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}
              >
                {counts.projects}+
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--white)', marginBottom: '0.2rem' }}>
                Projects Delivered
              </div>
              <div style={{ fontSize: '0.82rem', color: '#B4C0BA' }}>
                Residential & Commercial [Sample metric]
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 4vw, 3.8rem)',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--accent)',
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}
              >
                {counts.clients.toLocaleString()}+
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--white)', marginBottom: '0.2rem' }}>
                Delighted Clients
              </div>
              <div style={{ fontSize: '0.82rem', color: '#B4C0BA' }}>
                Families and corporate entities
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 4vw, 3.8rem)',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--accent)',
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}
              >
                {counts.cities}+
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--white)', marginBottom: '0.2rem' }}>
                Operational Hubs
              </div>
              <div style={{ fontSize: '0.82rem', color: '#B4C0BA' }}>
                Delhi NCR & Tier-1 Metros [Sample metric]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. WHY CHOOSE US (ARCHITECTURAL ADVANTAGES)
          ========================================================================= */}
      <section className="section section-white" id="why-choose-us">
        <div className="container">
          <SectionHeading
            badge="The Anubhuti Distinction"
            title="Engineering Integrity Meets Refined Aesthetics"
            subtitle="Our integrated multidisciplinary approach eliminates hand-off frictions between architects, civil contractors, realtors, and interior decorators."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--tint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0,
                }}
              >
                <Shield size={26} color="var(--accent)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--primary)' }}>
                  Uncompromising Structural Quality
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.6 }}>
                  Strict adherence to IS 456 & IS 1893 seismic standards, certified grade FE 550D TMT reinforcement, and computer-verified cube compression test audits.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--tint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0,
                }}
              >
                <Clock size={26} color="var(--accent)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--primary)' }}>
                  Guaranteed Handover Timelines
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.6 }}>
                  Detailed Gantt-chart milestones with daily photo reporting through our digital project tracking system, backed by contractual commitment.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--tint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0,
                }}
              >
                <Award size={26} color="var(--accent)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--primary)' }}>
                  Transparent Bills of Quantities (BOQ)
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.6 }}>
                  Zero hidden escalations. Detailed itemized specifications for every brass hinge, conduit pipe, cubic meter of concrete, and square foot of marble.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--tint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0,
                }}
              >
                <CheckCircle size={26} color="var(--accent)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--primary)' }}>
                  RERA Due-Diligence & Clean Titles
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.6 }}>
                  Our legal advisory wing verifies 30-year search titles, municipal zoning clearances, and encumbrance certificates prior to any real estate listing.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--tint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0,
                }}
              >
                <Users size={26} color="var(--accent)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--primary)' }}>
                  Single-Point Accountability
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.6 }}>
                  A dedicated Senior Project Director supervises your engagement from soil testing to interior styling, eliminating inter-vendor conflicts.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--tint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0,
                }}
              >
                <Compass size={26} color="var(--accent)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--primary)' }}>
                  Sustainable Green Engineering
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.6 }}>
                  Integration of solar microgrids, rainwater harvesting percolation pits, and low-VOC non-toxic materials for lasting ecological living.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FEATURED LANDMARK PROJECTS
          ========================================================================= */}
      <section className="section" id="featured-projects">
        <div className="container">
          <SectionHeading
            badge="Portfolio Gallery"
            title="Featured Landmarks & Curated Work"
            subtitle="Explore our civil construction structures and bespoke interior living spaces executed across Delhi-NCR and metropolitan hubs."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem',
            }}
          >
            {featuredProjects.slice(0, 6).map((proj) => (
              <ProjectCard key={proj._id} project={proj} />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/construction" className="btn btn-outline btn-lg" style={{ marginRight: '1rem' }}>
              <span>View Construction Projects</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link to="/interiors" className="btn btn-primary btn-lg">
              <span>View Interior Portfolio</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. TESTIMONIALS SLIDER
          ========================================================================= */}
      <section className="section section-white" id="testimonials">
        <div className="container">
          <SectionHeading
            badge="Client Voices"
            title="Words of Appreciation"
            subtitle="Read reflections from property owners, institutional corporate clients, and residents who entrusted their spaces to Anubhuti Group."
          />

          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* =========================================================================
          7. FINAL LUXURY CALL TO ACTION BANNER
          ========================================================================= */}
      <section
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--white)',
          padding: '5.5rem 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 80% 50%, rgba(184, 147, 90, 0.25) 0%, transparent 60%)`,
            zIndex: 1,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '820px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>
            Begin Your Journey
          </span>
          <h2
            style={{
              color: 'var(--white)',
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 1.2,
              marginBottom: '1.25rem',
            }}
          >
            Ready to Build Your Architectural Vision or Acquire Prime Real Estate?
          </h2>
          <p
            style={{
              color: '#D1DAD5',
              fontSize: '1.1rem',
              lineHeight: 1.65,
              marginBottom: '2.5rem',
            }}
          >
            Speak directly with our engineering directors and senior property advisors. We provide comprehensive civil feasibility, legal title verification, and custom 3D architectural renders.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              type="button"
              className="btn btn-gold btn-lg"
              onClick={() => openQuoteModal('General')}
            >
              <span>Schedule Executive Consultation</span>
              <ArrowRight size={18} />
            </button>
            <Link to="/about-contact" className="btn btn-outline-white btn-lg">
              <span>Contact Branch Offices</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

