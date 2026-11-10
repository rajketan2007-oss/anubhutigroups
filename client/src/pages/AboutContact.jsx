import React, { useEffect } from 'react';
import {
  Shield,
  Eye,
  Target,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';

const AboutContact = () => {
  useEffect(() => {
    document.title = 'About & Contact | Anubhuti Group of Companies';
    window.scrollTo(0, 0);
  }, []);

  const coreValues = [
    {
      title: 'Integrity First',
      desc: 'Transparent contracts, zero hidden costs, and honest engineering audits guiding every client partnership.',
    },
    {
      title: 'Architectural Excellence',
      desc: 'Obsession with millimeter-precision tolerances, structural durability, and refined international aesthetics.',
    },
    {
      title: 'Punctual Handover',
      desc: 'Contractually bound milestone delivery schedules enforced through real-time digital project tracking.',
    },
    {
      title: 'Sustainable Responsibility',
      desc: 'Incorporating green building standards, rainwater conservation, and non-toxic certified sustainable finishes.',
    },
  ];

  const leadershipTeam = [
    {
      name: 'Er. Rajeshwar Verma [Sample Placeholder]',
      role: 'Founder & Chairman, Anubhuti Group',
      desc: 'Over 28 years of landmark infrastructure leadership across industrial PEBs and Grade-A commercial developments in India.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Aakash Singhania [Sample Placeholder]',
      role: 'Managing Director, Anubhuti Realtor',
      desc: 'Former investment banker with 16 years of strategic capital deployment and luxury real estate asset management in NCR.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Ar. Tanvi Deshmukh [Sample Placeholder]',
      role: 'Principal Architect, Anubhuti Interiors',
      desc: 'Gold-medalist interior architect specializing in European minimalist joinery and biophilic corporate headquarters design.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const milestones = [
    {
      year: '2008',
      title: 'Foundation of Anubhuti Group',
      desc: 'Commenced civil contracting operations with residential bungalow foundations and RCC framed structures in NCR. [Sample data]',
    },
    {
      year: '2014',
      title: 'Expansion into Commercial Infra',
      desc: 'Delivered our first 100,000+ sq.ft logistics park and Grade-A commercial office tower ahead of schedule. [Sample data]',
    },
    {
      year: '2019',
      title: 'Launch of Anubhuti Realtor',
      desc: 'Established our institutional brokerage and title due diligence wing to provide end-to-end legal title security for investors. [Sample data]',
    },
    {
      year: '2022',
      title: 'Launch of Anubhuti Interiors',
      desc: 'Inaugurated our turnkey interior architecture studio with in-house German precision modular joinery manufacturing. [Sample data]',
    },
    {
      year: '2026',
      title: 'Sustainable Smart Living Milestone',
      desc: 'Surpassed 350+ completed landmark deliverables across civil construction, real estate advisory, and luxury interiors. [Sample data]',
    },
  ];

  return (
    <div>
      {/* Page Hero */}
      <PageHero
        badge="Corporate Profile & Engagement"
        badgeClass="badge-gold"
        title="Our Heritage, Leadership & Strategic Presence"
        subtitle="Learn about the values that guide Anubhuti Group of Companies and connect directly with our corporate headquarters in New Delhi NCR."
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
        breadcrumbs={[{ name: 'About & Contact', path: null }]}
      />

      {/* =========================================================================
          1. COMPANY STORY, VISION & MISSION
          ========================================================================= */}
      <section className="section" id="story">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="badge badge-gold">The Anubhuti Legacy</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--primary)', marginBottom: '1.25rem' }}>
                Building Trust, Creating Spaces, and Delivering Dreams Since 2008
              </h2>
              <p style={{ color: 'var(--text)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                Founded on the tenets of unassailable civil craftsmanship and transparent corporate ethics, Anubhuti Group of Companies has evolved from a boutique civil engineering firm into a diversified conglomerate spanning infrastructure construction, verified real estate consultancy, and luxury turnkey interior architecture.
              </p>
              <p style={{ color: 'var(--text)', fontSize: '1rem', lineHeight: 1.7 }}>
                Our integrated synergy across three specialized verticals ensures that every investor, family, or enterprise enjoys single-point accountability—from bare land acquisition to civil foundation and bespoke interior handover.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1.5rem',
              }}
            >
              {/* Vision Card */}
              <div
                style={{
                  backgroundColor: 'var(--surface)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                  borderLeft: '4px solid var(--accent)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.6rem' }}>
                  <Eye size={22} color="var(--accent)" />
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', margin: 0 }}>Our Vision</h3>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
                  To be acknowledged as India’s most reliable and architecturally refined infrastructure group, celebrated for structural resilience, legal transparency, and bespoke living spaces.
                </p>
              </div>

              {/* Mission Card */}
              <div
                style={{
                  backgroundColor: 'var(--surface)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                  borderLeft: '4px solid var(--primary)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.6rem' }}>
                  <Target size={22} color="var(--primary)" />
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', margin: 0 }}>Our Mission</h3>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
                  To deliver enduring value to property owners, institutional investors, and communities by combining scientific civil engineering with ethical advisory and artisanal interior craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CORE VALUES
          ========================================================================= */}
      <section className="section section-white" id="values">
        <div className="container">
          <SectionHeading
            badge="Foundational Tenets"
            title="The Principles That Steer Every Handshake"
            subtitle="Our core values govern our site safety protocols, legal verifications, and financial transparency."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
            }}
          >
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--bg)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <Shield size={24} color="var(--accent)" style={{ marginBottom: '0.85rem' }} />
                <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.45rem' }}>
                  {val.title}
                </h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. LEADERSHIP TEAM (CLEARLY LABELED PLACEHOLDERS)
          ========================================================================= */}
      <section className="section" id="leadership">
        <div className="container">
          <SectionHeading
            badge="Executive Stewardship"
            title="Leadership Guiding Our Growth"
            subtitle="Senior leadership profiles below are clearly marked placeholders pending verified executive biographies."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {leadershipTeam.map((leader, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '280px', overflow: 'hidden' }}>
                  <img
                    src={leader.image}
                    alt={leader.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>
                    {leader.role}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '0.65rem' }}>
                    {leader.name}
                  </h3>
                  <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                    {leader.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. COMPANY MILESTONES TIMELINE
          ========================================================================= */}
      <section className="section section-white" id="milestones">
        <div className="container">
          <SectionHeading
            badge="Historical Journey"
            title="Eighteen Years of Landmark Achievements"
            subtitle="Key evolutionary stages that established Anubhuti Group of Companies as an industry pioneer."
          />

          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
            {milestones.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '1.75rem',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    fontSize: '1.3rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    backgroundColor: 'var(--primary)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    minWidth: '80px',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {item.year}
                </div>
                <div
                  style={{
                    backgroundColor: 'var(--bg)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    flex: 1,
                  }}
                >
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.35rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. CONTACT SECTION: FORM, ADDRESS, GOOGLE MAPS EMBED
          ========================================================================= */}
      <section className="section" id="contact">
        <div className="container">
          <SectionHeading
            badge="Reach Our Executives"
            title="Connect with Anubhuti Corporate Offices"
            subtitle="Our senior advisory team is available for in-person consultations, technical evaluations, and physical site inspections."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '3rem',
            }}
          >
            {/* Contact Details & Map Card */}
            <div>
              <div
                style={{
                  backgroundColor: 'var(--surface)',
                  padding: '2.5rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-md)',
                  marginBottom: '2rem',
                }}
              >
                <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                  Headquarters & Regional Branches
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.95rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--tint)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent)',
                        flexShrink: 0,
                      }}
                    >
                      <MapPin size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '2px' }}>
                        Corporate Address [Placeholder]:
                      </strong>
                      <span style={{ color: 'var(--text)', lineHeight: 1.6 }}>
                        Anubhuti Corporate Tower, Level 8, Business Boulevard, Premier Business District, New Delhi / NCR, 110001, India.
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--tint)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent)',
                        flexShrink: 0,
                      }}
                    >
                      <Phone size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '2px' }}>
                        Direct Inquiries:
                      </strong>
                      <a href="tel:+918252109615" style={{ color: 'var(--text)' }}>
                        +91 8252109615
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--tint)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent)',
                        flexShrink: 0,
                      }}
                    >
                      <Mail size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '2px' }}>
                        Official Email:
                      </strong>
                      <a href="mailto:info@anubhutigroup.com" style={{ color: 'var(--text)' }}>
                        [info@anubhutigroup.com]
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--tint)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent)',
                        flexShrink: 0,
                      }}
                    >
                      <Clock size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '2px' }}>
                        Business Hours:
                      </strong>
                      <span style={{ color: 'var(--text)' }}>
                        Monday – Saturday: 9:30 AM – 7:00 PM IST<br />
                        Sunday: Site Visits by Prior Appointment
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '1rem' }}>
                  <a
                    href="https://wa.me/918252109615"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-soft btn-sm"
                    style={{ flex: 1 }}
                  >
                    <MessageCircle size={15} color="var(--whatsapp)" />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </div>

              {/* Google Maps Embed Placeholder */}
              <div
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                  height: '240px',
                  position: 'relative',
                  backgroundColor: '#ECE7DE',
                }}
              >
                <iframe
                  title="Anubhuti Group Headquarters Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114861614777!2d77.216721!3d28.6328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b049d5c3%3A0xb36310cfbb0ef4a8!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Direct Contact Form */}
            <div>
              <ContactForm
                defaultDivision="General"
                source="About & Contact Page"
                title="Send a Direct Priority Inquiry"
                subtitle="Fill out the form below and an Anubhuti Group senior consultant will connect with you."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutContact;

