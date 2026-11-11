import React, { useState, useEffect } from 'react';
import {
  HardHat,
  Home,
  Building,
  Factory,
  Wrench,
  ClipboardCheck,
  CheckCircle2,
  ShieldAlert,
  Layers,
  ArrowRight,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import FAQAccordion from '../components/FAQAccordion';
import ContactForm from '../components/ContactForm';
import Loader from '../components/Loader';
import { api } from '../services/api';
import { useModal } from '../context/ModalContext';

const Construction = () => {
  const { openQuoteModal } = useModal();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Anubhuti Construction | High-Precision Civil & Structural Engineering';
    window.scrollTo(0, 0);

    const fetchProjects = async () => {
      try {
        const res = await api.getProjects({ division: 'Construction' });
        if (res.success) {
          setProjects(res.data);
        }
      } catch (err) {
        console.error('Construction projects fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => (p.category || '').toLowerCase().includes(filter.toLowerCase()));

  const constructionServices = [
    {
      icon: Home,
      title: 'Residential Construction',
      desc: 'Bespoke independent villas, ultra-luxury duplexes, and multi-storey gated residential enclaves built with earthquake-resistant RCC structures and premium elevations.',
    },
    {
      icon: Building,
      title: 'Commercial Buildings',
      desc: 'Grade-A corporate office towers, IT tech parks, shopping complexes, and retail frontage built to international LEED Gold and IGBC green building norms.',
    },
    {
      icon: Factory,
      title: 'Industrial & Infrastructure',
      desc: 'Pre-engineered steel buildings (PEB), high-load warehouse hubs, manufacturing plant floors with laser-screed concrete, and internal arterial roads.',
    },
    {
      icon: Wrench,
      title: 'Renovation & Structural Repair',
      desc: 'Seismic retrofitting, structural strengthening with carbon-fiber wrapping, facade renewal, and complete modernization of existing vintage estates.',
    },
    {
      icon: ClipboardCheck,
      title: 'Turnkey Project Management',
      desc: 'End-to-end execution covering architectural drawings, structural engineering, government liaisons, BOQ budgeting, vendor auditing, and timely delivery.',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consultation & Site Feasibility',
      desc: 'Topographical land survey, soil-bearing capacity (SBC) testing, groundwater assessment, and initial architectural brief alignment.',
    },
    {
      step: '02',
      title: 'Design & Structural Engineering',
      desc: '3D BIM modeling, seismic frame analysis by licensed structural engineers, electrical/plumbing (MEP) schematics, and BOQ estimation.',
    },
    {
      step: '03',
      title: 'Municipal Approvals & NOCs',
      desc: 'Navigating municipal sanction drawings, environmental impact assessments, fire department clearances, and RERA registration compliance.',
    },
    {
      step: '04',
      title: 'Civil Construction & RCC Works',
      desc: 'Precision raft foundation, certified FE 550D reinforcement tying, batch-mixed RMC casting with continuous cube strength compression testing.',
    },
    {
      step: '05',
      title: 'Quality Check & Structural Audits',
      desc: 'Non-destructive ultrasonic testing (NDT), water-retaining ponding tests on roof slabs, thermal imaging, and third-party inspection sign-offs.',
    },
    {
      step: '06',
      title: 'Final Handover & Occupancy',
      desc: 'Issuance of Occupancy Certificate (OC), snagging clearance, complete as-built CAD blueprints, and structural warranty handover.',
    },
  ];

  const materialStandards = [
    {
      material: 'Reinforced Steel (TMT)',
      spec: 'Tata Tiscon / Jindal Panther FE 550D / 500D with high elongation for superior earthquake ductility.',
    },
    {
      material: 'Structural Cement',
      spec: 'UltraTech / ACC OPC 53 Grade for RCC columns & slabs; PPC for durable masonry and plastering.',
    },
    {
      material: 'Ready-Mix Concrete (RMC)',
      spec: 'Computerized batch-plant M25 to M40 mix designs with calibrated water-cement ratio and superplasticizers.',
    },
    {
      material: 'Thermal & Waterproofing',
      spec: 'APP modified bituminous membranes, polyurethane liquid coatings, and extruded polystyrene (XPS) roof insulation.',
    },
  ];

  const faqs = [
    {
      question: 'What is your turnkey civil construction timeline for a residential villa?',
      answer:
        'A standard 4,000 to 6,000 sq.ft luxury villa typically requires 10 to 14 months from foundation excavation to turnkey completion, contingent upon design complexities and municipal sanction speeds. We provide contractually bound milestone schedules with liquidated damages protection.',
    },
    {
      question: 'Do you facilitate municipal building permits and RERA approvals?',
      answer:
        'Yes. Anubhuti Construction possesses a dedicated legal and liaison team that interfaces with local development authorities (such as DDA, DTCP, HUDA, and NOIDA Authority) to secure sanctioned building plans, fire NOCs, and environmental clearances.',
    },
    {
      question: 'How do you guarantee material quality and prevent cost overruns?',
      answer:
        'We operate on transparent, itemized Bills of Quantities (BOQs) with fixed pricing tiers. Every batch of cement and steel undergoes independent NABL-accredited laboratory testing, with test certificates provided to the client at every milestone.',
    },
    {
      question: 'Can clients monitor construction progress remotely?',
      answer:
        'Absolutely. Our clients receive dedicated access to our weekly photo logs, 360-degree drone flythrough videos, and Gantt-chart tracking reports showing work completion against scheduled baseline targets.',
    },
  ];

  return (
    <div>
      {/* Page Hero */}
      <PageHero
        badge="Civil & Structural Division"
        badgeClass="badge-construction"
        title="Engineering Monumental Legacies with Uncompromising Rigor"
        subtitle="From high-rise commercial corporate glass towers to contemporary residential enclaves and institutional campuses, Anubhuti Construction delivers structural precision, certified materials, and punctual execution."
        bgImage="/images/construction/commercial-glass-facade-tower.jpg"
        breadcrumbs={[{ name: 'Anubhuti Construction', path: null }]}
      />

      {/* =========================================================================
          1. FIVE SPECIALIZED CONSTRUCTION SERVICES
          ========================================================================= */}
      <section className="section" id="services">
        <div className="container">
          <SectionHeading
            badge="Core Disciplines"
            title="Comprehensive Construction Capabilities"
            subtitle="Engineered with modern building information modeling (BIM), seismic resilience, and stringent civil quality control protocols."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {constructionServices.map((srv, idx) => {
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
                      backgroundColor: 'var(--tint)',
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
                      onClick={() => openQuoteModal('Construction')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--accent)',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                      }}
                    >
                      <span>Inquire for this Service</span>
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
          2. SIX-STEP CONSTRUCTION PROCESS
          ========================================================================= */}
      <section className="section section-white" id="process">
        <div className="container">
          <SectionHeading
            badge="Methodology"
            title="Our Six-Step Civil Engineering Lifecycle"
            subtitle="A structured, transparent roadmap from raw terrain feasibility to certified structural handover."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--bg)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: '2.5rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    lineHeight: 1,
                    marginBottom: '0.75rem',
                  }}
                >
                  {step.step}
                </div>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CONSTRUCTION PROJECTS GALLERY WITH FILTERS
          ========================================================================= */}
      <section className="section" id="projects">
        <div className="container">
          <SectionHeading
            badge="Project Archive"
            title="Landmark Construction Deliverables"
            subtitle="Explore our ongoing and successfully completed civil projects across NCR and industrial development corridors."
          />

          {/* Filter Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '3rem',
              flexWrap: 'wrap',
            }}
          >
            {['All', 'Commercial', 'Residential', 'Institutional'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`btn btn-sm ${filter === tab ? 'btn-primary' : 'btn-soft'}`}
                style={{ minWidth: '110px' }}
              >
                {tab === 'All' ? 'All Projects (5)' : `${tab} Works`}
              </button>
            ))}
          </div>

          {loading ? (
            <Loader message="Loading construction project records..." />
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
          4. MATERIALS & QUALITY ASSURANCE PROTOCOLS
          ========================================================================= */}
      <section className="section section-dark" id="quality">
        <div className="container">
          <SectionHeading
            badge="Engineering Standards"
            badgeClass="badge-gold"
            title="Certified Materials & Seismic Rigor"
            subtitle="We partner strictly with primary manufacturers to ensure every structure withstands time, seismic stress, and harsh weathering."
            dark={true}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem',
            }}
          >
            {materialStandards.map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                  <CheckCircle2 size={20} color="var(--accent)" />
                  <h4 style={{ color: 'var(--white)', margin: 0, fontSize: '1.15rem' }}>
                    {item.material}
                  </h4>
                </div>
                <p style={{ color: '#BAC7C1', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  {item.spec}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              backgroundColor: 'rgba(184, 147, 90, 0.15)',
              border: '1px solid var(--border-accent)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            <ShieldAlert size={32} color="var(--accent)" flexShrink={0} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: 'var(--white)', fontSize: '1rem', marginBottom: '2px' }}>
                Zero Tolerance for Substandard Supplies
              </div>
              <div style={{ color: '#D1DAD5', fontSize: '0.88rem' }}>
                All steel bar deliveries are verified with mill test certificates and random tensile stress test bar cuts prior to column tying.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. ACCESSIBLE FAQ ACCORDION
          ========================================================================= */}
      <section className="section" id="faq">
        <div className="container">
          <SectionHeading
            badge="Common Inquiries"
            title="Frequently Asked Construction Questions"
            subtitle="Get clear, straightforward answers about our civil contracting agreements, timelines, and structural guarantees."
          />

          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* =========================================================================
          6. DEDICATED CONSTRUCTION ENQUIRY FORM
          ========================================================================= */}
      <section className="section section-white" id="enquiry">
        <div className="container" style={{ maxWidth: '850px' }}>
          <SectionHeading
            badge="Direct Consultation"
            title="Initiate Your Construction Feasibility"
            subtitle="Provide your plot details, structural requirements, and location for a formal civil engineering consultation."
          />

          <ContactForm
            defaultDivision="Construction"
            source="Construction Page Form"
            title="Request Civil Construction Estimate"
            subtitle="Our chief civil engineer reviews all technical submissions and prepares an initial BOQ estimate."
          />
        </div>
      </section>
    </div>
  );
};

export default Construction;

