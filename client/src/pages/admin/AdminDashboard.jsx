import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Inbox,
  Building,
  Briefcase,
  MessageSquare,
  LogOut,
  Search,
  Trash2,
  CheckCircle,
  Plus,
  RefreshCw,
  ExternalLink,
  Shield,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import Loader from '../../components/Loader';

const AdminDashboard = () => {
  const { admin, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('enquiries');

  // Enquiries state
  const [enquiries, setEnquiries] = useState([]);
  const [enqTotal, setEnqTotal] = useState(0);
  const [enqLoading, setEnqLoading] = useState(false);
  const [divisionFilter, setDivisionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Properties state
  const [properties, setProperties] = useState([]);
  const [propLoading, setPropLoading] = useState(false);
  const [showAddPropModal, setShowAddPropModal] = useState(false);
  const [newProp, setNewProp] = useState({
    title: '',
    description: '',
    price: '₹3.50 Cr',
    priceNumeric: 35000000,
    location: 'Sector 65, Golf Course Ext.',
    city: 'Gurugram',
    propertyType: 'Flat',
    purpose: 'Buy',
    bhk: '3 BHK',
    area: '2,400 sq.ft',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  });

  // Projects state
  const [projects, setProjects] = useState([]);
  const [projLoading, setProjLoading] = useState(false);
  const [showAddProjModal, setShowAddProjModal] = useState(false);
  const [newProj, setNewProj] = useState({
    title: '',
    division: 'Construction',
    category: 'Commercial',
    description: '',
    location: 'Delhi NCR',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=80',
    specs: ['Seismic Compliant', 'Grade-A Material'],
  });

  // Testimonials state
  const [testimonials, setTestimonials] = useState([]);
  const [testLoading, setTestLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  // Load Enquiries
  const loadEnquiries = async () => {
    setEnqLoading(true);
    try {
      const params = {};
      if (divisionFilter !== 'All') params.division = divisionFilter;
      if (statusFilter !== 'All') params.status = statusFilter;
      if (searchQuery.trim()) params.search = searchQuery.trim();

      const res = await api.getEnquiries(params);
      if (res.success) {
        setEnquiries(res.data);
        setEnqTotal(res.total);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEnqLoading(false);
    }
  };

  // Load Properties
  const loadProperties = async () => {
    setPropLoading(true);
    try {
      const res = await api.getProperties({ limit: 50 });
      if (res.success) setProperties(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setPropLoading(false);
    }
  };

  // Load Projects
  const loadProjects = async () => {
    setProjLoading(true);
    try {
      const res = await api.getProjects({ limit: 50 });
      if (res.success) setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setProjLoading(false);
    }
  };

  // Load Testimonials
  const loadTestimonials = async () => {
    setTestLoading(true);
    try {
      const res = await api.getTestimonials({});
      if (res.success) setTestimonials(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setTestLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'enquiries') loadEnquiries();
    if (activeTab === 'properties') loadProperties();
    if (activeTab === 'projects') loadProjects();
    if (activeTab === 'testimonials') loadTestimonials();
  }, [activeTab, divisionFilter, statusFilter]);

  // Handle Enquiry Status Update
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.updateEnquiryStatus(id, newStatus);
      if (res.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      alert('Failed to update inquiry status: ' + err.message);
    }
  };

  // Handle Enquiry Delete
  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry record?')) return;
    try {
      const res = await api.deleteEnquiry(id);
      if (res.success) {
        setEnquiries((prev) => prev.filter((e) => e._id !== id));
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // Handle Create Property
  const handleCreateProperty = async (e) => {
    e.preventDefault();
    try {
      const res = await api.createProperty(newProp);
      if (res.success) {
        setShowAddPropModal(false);
        loadProperties();
        setNewProp({
          title: '',
          description: '',
          price: '₹3.50 Cr',
          priceNumeric: 35000000,
          location: 'Sector 65, Golf Course Ext.',
          city: 'Gurugram',
          propertyType: 'Flat',
          purpose: 'Buy',
          bhk: '3 BHK',
          area: '2,400 sq.ft',
          imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        });
      }
    } catch (err) {
      alert('Failed to create property: ' + err.message);
    }
  };

  // Handle Delete Property
  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Delete this property listing?')) return;
    try {
      const res = await api.deleteProperty(id);
      if (res.success) {
        setProperties((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // Handle Create Project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const res = await api.createProject(newProj);
      if (res.success) {
        setShowAddProjModal(false);
        loadProjects();
        setNewProj({
          title: '',
          division: 'Construction',
          category: 'Commercial',
          description: '',
          location: 'Delhi NCR',
          year: '2025',
          imageUrl: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=80',
          specs: ['Seismic Compliant', 'Grade-A Material'],
        });
      }
    } catch (err) {
      alert('Failed to create project: ' + err.message);
    }
  };

  // Handle Delete Project
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project entry?')) return;
    try {
      const res = await api.deleteProject(id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const pendingCount = enquiries.filter((e) => e.status === 'Pending').length;

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Admin Header */}
      <div
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--white)',
          padding: '1.5rem 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '0.2rem' }}>
              Executive Dashboard
            </span>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--white)', margin: 0 }}>
              Anubhuti Management Console
            </h1>
            <div style={{ fontSize: '0.85rem', color: '#B4C0BA' }}>
              Logged in as <strong>{admin?.username || 'Super Admin'}</strong> ({admin?.email})
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn btn-outline-white btn-sm"
              onClick={() => {
                logout();
                navigate('/admin');
              }}
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <div style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.84rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Total Inquiries
            </div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: 'var(--primary)', fontWeight: 700 }}>
              {enquiries.length}
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border-accent)' }}>
            <div style={{ fontSize: '0.84rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase' }}>
              Pending Attention
            </div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: 'var(--accent)', fontWeight: 700 }}>
              {pendingCount}
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.84rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Properties in Catalog
            </div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: 'var(--primary)', fontWeight: 700 }}>
              {properties.length || 6}
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.84rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Active Showcase Projects
            </div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: 'var(--primary)', fontWeight: 700 }}>
              {projects.length || 6}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '2px solid var(--border)',
            marginBottom: '2rem',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '2px',
          }}
        >
          {[
            { id: 'enquiries', label: 'Client Inquiries', icon: Inbox },
            { id: 'properties', label: 'Realtor Properties', icon: Building },
            { id: 'projects', label: 'Projects & Portfolio', icon: Briefcase },
            { id: 'testimonials', label: 'Reviews & Feedback', icon: MessageSquare },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.85rem 1.4rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: isActive ? 'var(--primary)' : 'var(--muted)',
                  borderBottom: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                  marginBottom: '-2px',
                  backgroundColor: 'transparent',
                }}
              >
                <IconComp size={18} color={isActive ? 'var(--accent)' : 'var(--muted)'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =====================================================================
            TAB 1: INQUIRIES MANAGEMENT
            ===================================================================== */}
        {activeTab === 'enquiries' && (
          <div>
            {/* Filter & Search Bar */}
            <div
              style={{
                backgroundColor: 'var(--surface)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                marginBottom: '1.5rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flex: 1 }}>
                <select
                  className="form-control"
                  style={{ width: '180px' }}
                  value={divisionFilter}
                  onChange={(e) => setDivisionFilter(e.target.value)}
                >
                  <option value="All">All Divisions</option>
                  <option value="General">General</option>
                  <option value="Construction">Construction</option>
                  <option value="Realtor">Realtor</option>
                  <option value="Interiors">Interiors</option>
                </select>

                <select
                  className="form-control"
                  style={{ width: '180px' }}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>

                <div style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '220px' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search name, email, phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="button" className="btn btn-primary btn-sm" onClick={loadEnquiries}>
                    <Search size={15} />
                  </button>
                </div>
              </div>

              <button type="button" className="btn btn-soft btn-sm" onClick={loadEnquiries}>
                <RefreshCw size={14} />
                <span>Refresh</span>
              </button>
            </div>

            {/* Inquiries Table */}
            {enqLoading ? (
              <Loader message="Fetching live inquiries..." />
            ) : enquiries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--muted)', margin: 0 }}>No client inquiry records match the active criteria.</p>
              </div>
            ) : (
              <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--tint)', borderBottom: '1px solid var(--border)', color: 'var(--primary)' }}>
                      <th style={{ padding: '1rem' }}>Date</th>
                      <th style={{ padding: '1rem' }}>Client Details</th>
                      <th style={{ padding: '1rem' }}>Division</th>
                      <th style={{ padding: '1rem' }}>Inquiry Message</th>
                      <th style={{ padding: '1rem' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => (
                      <tr key={enq._id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '1rem', whiteSpace: 'nowrap', color: 'var(--muted)', fontSize: '0.82rem' }}>
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <strong style={{ color: 'var(--primary)', display: 'block' }}>{enq.fullName}</strong>
                          <span style={{ fontSize: '0.82rem', color: 'var(--text)' }}>{enq.phone}</span> •{' '}
                          <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{enq.email}</span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span className={`badge badge-${enq.division.toLowerCase()}`}>
                            {enq.division}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', maxWidth: '320px' }}>
                          <div style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.5 }}>
                            {enq.message}
                          </div>
                          {enq.budget && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--accent)', marginTop: '4px' }}>
                              Budget: {enq.budget}
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <select
                            value={enq.status}
                            onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                            style={{
                              padding: '0.35rem 0.6rem',
                              borderRadius: 'var(--radius-sm)',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              border: '1px solid var(--border)',
                              backgroundColor:
                                enq.status === 'Pending'
                                  ? 'var(--accent-soft)'
                                  : enq.status === 'Resolved'
                                  ? 'var(--success-bg)'
                                  : 'var(--tint)',
                              color: 'var(--primary)',
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleDeleteEnquiry(enq._id)}
                            style={{ color: 'var(--error)', padding: '6px' }}
                            aria-label="Delete inquiry"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            TAB 2: PROPERTIES CRUD
            ===================================================================== */}
        {activeTab === 'properties' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', margin: 0 }}>Realtor Catalog Listings</h3>
              <button
                type="button"
                className="btn btn-gold btn-sm"
                onClick={() => setShowAddPropModal(true)}
              >
                <Plus size={16} />
                <span>Add New Property</span>
              </button>
            </div>

            {propLoading ? (
              <Loader message="Loading properties..." />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {properties.map((prop) => (
                  <div key={prop._id} className="card" style={{ padding: '1.25rem' }}>
                    <img
                      src={prop.imageUrl}
                      alt={prop.title}
                      style={{ height: '180px', width: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span className="badge badge-realtor" style={{ margin: 0 }}>{prop.propertyType}</span>
                      <strong style={{ color: 'var(--primary)' }}>{prop.price}</strong>
                    </div>
                    <h4 style={{ fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{prop.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem' }}>{prop.location}, {prop.city}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>{prop.purpose}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteProperty(prop._id)}
                        style={{ color: 'var(--error)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            TAB 3: PROJECTS CRUD
            ===================================================================== */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', margin: 0 }}>Construction & Interior Projects</h3>
              <button
                type="button"
                className="btn btn-gold btn-sm"
                onClick={() => setShowAddProjModal(true)}
              >
                <Plus size={16} />
                <span>Add Showcase Project</span>
              </button>
            </div>

            {projLoading ? (
              <Loader message="Loading projects..." />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {projects.map((proj) => (
                  <div key={proj._id} className="card" style={{ padding: '1.25rem' }}>
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      style={{ height: '180px', width: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span className={`badge badge-${proj.division.toLowerCase()}`} style={{ margin: 0 }}>
                        {proj.division}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{proj.year || '2025'}</span>
                    </div>
                    <h4 style={{ fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '0.4rem' }}>{proj.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem' }}>{proj.location}</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(proj._id)}
                        style={{ color: 'var(--error)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            TAB 4: TESTIMONIALS
            ===================================================================== */}
        {activeTab === 'testimonials' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', margin: 0 }}>Client Reviews & Testimonials</h3>
            </div>

            {testLoading ? (
              <Loader message="Loading testimonials..." />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {testimonials.map((test) => (
                  <div key={test._id} className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                      <img
                        src={test.avatarUrl}
                        alt={test.clientName}
                        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <strong style={{ color: 'var(--primary)', display: 'block' }}>{test.clientName}</strong>
                        <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{test.role}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text)', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
                      "{test.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Property Modal */}
      {showAddPropModal && (
        <div className="modal-overlay" onClick={() => setShowAddPropModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1.25rem' }}>
              Create New Property Listing
            </h3>
            <form onSubmit={handleCreateProperty}>
              <div className="form-grid">
                <div className="form-group form-full">
                  <label className="form-label">Property Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProp.title}
                    onChange={(e) => setNewProp({ ...newProp, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Price (e.g. ₹3.50 Cr)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProp.price}
                    onChange={(e) => setNewProp({ ...newProp, price: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Numeric Price (for filter)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newProp.priceNumeric}
                    onChange={(e) => setNewProp({ ...newProp, priceNumeric: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProp.location}
                    onChange={(e) => setNewProp({ ...newProp, location: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Property Type</label>
                  <select
                    className="form-control"
                    value={newProp.propertyType}
                    onChange={(e) => setNewProp({ ...newProp, propertyType: e.target.value })}
                  >
                    <option value="Flat">Flat</option>
                    <option value="Villa">Villa</option>
                    <option value="Plot">Plot</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Purpose</label>
                  <select
                    className="form-control"
                    value={newProp.purpose}
                    onChange={(e) => setNewProp({ ...newProp, purpose: e.target.value })}
                  >
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">BHK / Area</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProp.bhk}
                    onChange={(e) => setNewProp({ ...newProp, bhk: e.target.value })}
                  />
                </div>
                <div className="form-group form-full">
                  <label className="form-label">Image URL</label>
                  <input
                    type="url"
                    className="form-control"
                    value={newProp.imageUrl}
                    onChange={(e) => setNewProp({ ...newProp, imageUrl: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group form-full">
                  <label className="form-label">Description</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    value={newProp.description}
                    onChange={(e) => setNewProp({ ...newProp, description: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group form-full" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="submit" className="btn btn-gold" style={{ flex: 1 }}>Save Property</button>
                  <button type="button" className="btn btn-soft" onClick={() => setShowAddPropModal(false)}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProjModal && (
        <div className="modal-overlay" onClick={() => setShowAddProjModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1.25rem' }}>
              Add Showcase Project
            </h3>
            <form onSubmit={handleCreateProject}>
              <div className="form-grid">
                <div className="form-group form-full">
                  <label className="form-label">Project Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProj.title}
                    onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Division</label>
                  <select
                    className="form-control"
                    value={newProj.division}
                    onChange={(e) => setNewProj({ ...newProj, division: e.target.value })}
                  >
                    <option value="Construction">Construction</option>
                    <option value="Interiors">Interiors</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Commercial / Living Room"
                    value={newProj.category}
                    onChange={(e) => setNewProj({ ...newProj, category: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProj.location}
                    onChange={(e) => setNewProj({ ...newProj, location: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Completion Year</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProj.year}
                    onChange={(e) => setNewProj({ ...newProj, year: e.target.value })}
                  />
                </div>
                <div className="form-group form-full">
                  <label className="form-label">Image URL</label>
                  <input
                    type="url"
                    className="form-control"
                    value={newProj.imageUrl}
                    onChange={(e) => setNewProj({ ...newProj, imageUrl: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group form-full">
                  <label className="form-label">Description</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    value={newProj.description}
                    onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group form-full" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="submit" className="btn btn-gold" style={{ flex: 1 }}>Save Project</button>
                  <button type="button" className="btn btn-soft" onClick={() => setShowAddProjModal(false)}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

