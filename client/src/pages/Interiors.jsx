import React, { useState, useEffect } from 'react';
import {
  Sofa,
  UtensilsCrossed,
  BedDouble,
  Briefcase,
  KeyRound,
  Maximize2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import TestimonialSlider from '../components/TestimonialSlider';
import ContactForm from '../components/ContactForm';
import Loader from '../components/Loader';
import { api } from '../services/api';
import { useModal } from '../context/ModalContext';

const Interiors = () => {
  const { openQuoteModal } = useModal();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    document.title = 'Anubhuti Interiors | Bespoke Luxury Architectural & Turnkey Interior Design';
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const [projRes, testRes] = await Promise.all([
          api.getProjects({ division: 'Interiors' }),
          api.getTestimonials({ division: 'Interiors' }),
        ]);
        if (projRes.success) setProjects(projRes.data);
        if (testRes.success) setTestimonials(testRes.data);
      } catch (err) {
        console.error('Interiors fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => {
          const cat = (p.category || '').toLowerCase();
          const f = filter.toLowerCase();
          if (cat.includes(f)) return true;
          if (f.includes('atrium') && (cat.includes('atrium') || cat.includes('reception') || cat.includes('lounge'))) return true;
          if (f.includes('suite') && (cat.includes('office') || cat.includes('boardroom') || cat.includes('cabin') || cat.includes('suite'))) return true;
          if (f.includes('auditorium') && (cat.includes('auditorium') || cat.includes('classroom') || cat.includes('seminar') || cat.includes('court') || cat.includes('theater'))) return true;
          if (f.includes('commercial') && (cat.includes('commercial') || cat.includes('cafeteria') || cat.includes('dining') || cat.includes('banking'))) return true;
          return false;
        });

  const interiorServices = [
    {
      icon: Sofa,
      title: 'Luxury Living Lounges',
      desc: 'Double-height living spaces, bespoke Italian marble accent walls, fluted acoustic paneling, and curated imported furniture layouts.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Bespoke Modular Kitchens',
      desc: 'Precision German hardware (Blum/Hettich), anti-scratch quartz countertops, built-in sensor lighting, and custom chef pantry units.',
    },
    {
      icon: BedDouble,
      title: 'Master Bedroom Sanctuaries',
      desc: 'Plush walk-in closets with tinted fluted glass, acoustic headboard walls, integrated circadian lighting, and ensuite bathroom suites.',
    },
    {
      icon: Briefcase,
      title: 'Corporate & Executive Offices',
      desc: 'Ergonomic agile workspaces, acoustic meeting pods, executive boardroom suites with smart switchable privacy glass.',
    },
    {
      icon: KeyRound,
      title: 'Turnkey Design-and-Build',
      desc: 'Complete turnkey ownership: 3D photorealistic renderings, MEP civil modifications, custom millwork joinery, lighting, and final styling.',
    },
  ];

  const designProcess = [
    {
      num: '01',
      title: 'Lifestyle Discovery',
      desc: 'In-depth consultation covering daily family routines, ergonomic needs, aesthetic moodboards, and budget framework.',
    },
    {
      num: '02',
      title: 'Space Planning & 2D Layouts',
      desc: 'Optimized furniture flow diagrams, MEP electrical conduit positions, ceiling layout plans, and architectural clearances.',
    },
    {
      num: '03',
      title: 'Photorealistic 3D Renders',
      desc: 'Experience your prospective home in ultra-high-definition 3D renders with exact material textures, lighting temperatures, and fabrics.',
    },
    {
      num: '04',
      title: 'Factory Joinery & Civil Fitouts',
      desc: 'Precision modular joinery manufactured offsite, followed by clean onsite installation, false ceiling framing, and marble inlay work.',
    },
    {
      num: '05',
      title: 'White-Glove Handover',
      desc: 'Complete deep cleaning, soft furnishing placement, automated smart-lighting calibration, and key handover with warranty certificates.',
    },
  ];

  const designStyles = [
    {
      name: 'Double-Height Grand Atrium',
      image: '/images/interiors/grand-atrium-lobby.jpg',
      desc: 'Bespoke geometric marble floor inlays, bookmatched statuario wall panels, and cascading crystal chandeliers.',
    },
    {
      name: 'Ultra-Luxury Executive Lounge',
      image: '/images/interiors/luxury-executive-lounge.jpg',
      desc: 'Fluted stone pillars, warm vertical cove lights, round nero-marquina tables, and custom leather seating.',
    },
    {
      name: 'High-Tech Corporate Boardroom',
      image: '/images/interiors/executive-boardroom.jpg',
      desc: '16-seater oak conference table, wireless AV integration, acoustic felt walls, and ergonomic mesh seating.',
    },
    {
      name: 'Biophilic Corporate Reception',
      image: '/images/interiors/corporate-welcome-lounge.jpg',
      desc: 'Lush indoor bonsai planters, textured natural timber walls, and bright panoramic curtain glazing.',
    },
  ];

  return (
    <div>
      {/* Page Hero */}
      <PageHero
        badge="Interior Architecture & Execution"
        badgeClass="badge-interiors"
        title="Transforming Spaces Into Refined Living Experiences"
        subtitle="From bespoke residential penthouses to elite corporate headquarters, Anubhuti Interiors merges ergonomic precision with handcrafted artisanal luxury."
        bgImage="/images/interiors/grand-atrium-lobby.jpg"
        breadcrumbs={[{ name: 'Anubhuti Interiors', path: null }]}
      />

      {/* =========================================================================
          1. FIVE INTERIOR SERVICES
          ========================================================================= */}
      <section className="section" id="services">
        <div className="container">
          <SectionHeading
            badge="Tailored Concepts"
            title="Curated Interior Design Capabilities"
            subtitle="Every detail crafted with imported surface materials, seamless hardware joinery, and tailored ergonomics."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {interiorServices.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="card"
                  style={{
                    padding: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    borderTop: '4px solid var(--accent)',
                  }}
                >
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--tint-interiors)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <IconComp size={28} color="var(--primary)" />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>
                    {srv.title}
                  </h3>
                  <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: 1.65, flex: 1 }}>
                    {srv.desc}
                  </p>
                  <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <button
                      type="button"
                      onClick={() => openQuoteModal('Interiors')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--accent)',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                      }}
                    >
                      <span>Consult Design Team</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PORTFOLIO GALLERY WITH CATEGORY FILTERS & LIGHTBOX
          ========================================================================= */}
      <section className="section section-white" id="portfolio">
        <div className="container">
          <SectionHeading
            badge="Design Gallery"
            title="Curated Residential & Commercial Portfolio"
            subtitle="Filter by space type to inspect our turnkey architectural aesthetics and fine detailing."
          />

          {/* Filters */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '3rem',
              flexWrap: 'wrap',
            }}
          >
            {['All', 'Corporate Atriums', 'Executive Suites', 'Auditoriums', 'Commercial Spaces'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`btn btn-sm ${filter === tab ? 'btn-primary' : 'btn-soft'}`}
                style={{ minWidth: '120px' }}
              >
                {tab === 'All' ? 'All Spaces (14)' : tab}
              </button>
            ))}
          </div>

          {loading ? (
            <Loader message="Loading curated interior portfolio..." />
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '2rem',
              }}
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          3. FIVE-STEP INTERIOR DESIGN PROCESS
          ========================================================================= */}
      <section className="section" id="process">
        <div className="container">
          <SectionHeading
            badge="Seamless Journey"
            title="Our Five-Step Turnkey Execution Process"
            subtitle="From lifestyle consultation to turnkey handover with total budget predictability and zero surprises."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {designProcess.map((step, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--surface)',
                  padding: '2rem 1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-xs)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: '2.4rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    lineHeight: 1,
                    marginBottom: '0.75rem',
                  }}
                >
                  {step.num}
                </div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '0.4rem' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. DESIGN STYLES SHOWCASE
          ========================================================================= */}
      <section className="section section-white" id="styles">
        <div className="container">
          <SectionHeading
            badge="Aesthetic Vocabulary"
            title="Explore Interior Aesthetic Styles"
            subtitle="Whether you resonate with understated warm minimalism or bold regal luxury, our design masters articulate your vision."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {designStyles.map((style, i) => (
              <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img
                    src={style.image}
                    alt={style.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h4 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                    {style.name}
                  </h4>
                  <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                    {style.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. INTERIORS TESTIMONIALS
          ========================================================================= */}
      <section className="section section-dark" id="interiors-testimonials">
        <div className="container">
          <SectionHeading
            badge="Client Endorsements"
            badgeClass="badge-gold"
            title="What Homeowners & Executives Say"
            subtitle="Verified reviews from turnkey interior transformations across premium residences and commercial studios."
            dark={true}
          />

          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* =========================================================================
          6. FREE DESIGN CONSULTATION FORM
          ========================================================================= */}
      <section className="section section-white" id="consultation">
        <div className="container" style={{ maxWidth: '850px' }}>
          <SectionHeading
            badge="Complimentary 3D Briefing"
            title="Book Your Free Design Consultation"
            subtitle="Share your floorplan or carpet area to schedule a one-on-one session with our Principal Interior Architect."
          />

          <ContactForm
            defaultDivision="Interiors"
            source="Interiors Free Consultation Form"
            title="Request Free 3D Design Consultation"
            subtitle="Our interior studio will prepare custom moodboards and material estimates for your review."
          />
        </div>
      </section>
    </div>
  );
};

export default Interiors;

