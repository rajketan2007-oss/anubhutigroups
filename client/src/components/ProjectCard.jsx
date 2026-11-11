import React from 'react';
import { MapPin, Calendar, Maximize2, Layers } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const ProjectCard = ({ project }) => {
  const { openLightbox } = useModal();

  const getBadgeClass = (division) => {
    if (division === 'Construction') return 'badge-construction';
    if (division === 'Interiors') return 'badge-interiors';
    return 'badge-gold';
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Project Image Wrapper with Zoom / Lightbox Trigger */}
      <div
        style={{
          position: 'relative',
          height: '240px',
          overflow: 'hidden',
          backgroundColor: '#EAE6DF',
        }}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=80';
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        {/* Floating Category Tag */}
        <span
          className={`badge ${getBadgeClass(project.division)}`}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            margin: 0,
            backdropFilter: 'blur(4px)',
          }}
        >
          {project.category}
        </span>

        {/* Lightbox Zoom Icon Button */}
        <button
          type="button"
          onClick={() => openLightbox(project.imageUrl, `${project.title} — ${project.location}`)}
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'rgba(31, 61, 54, 0.9)',
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'transform var(--transition-fast), background-color var(--transition-fast)',
            touchAction: 'manipulation',
          }}
          aria-label={`View enlarged image of ${project.title}`}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.backgroundColor = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = 'rgba(31, 61, 54, 0.85)';
          }}
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Project Details */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>
          <MapPin size={14} color="var(--accent)" />
          <span>{project.location}</span>
          <span style={{ margin: '0 4px' }}>•</span>
          <Calendar size={14} color="var(--accent)" />
          <span>{project.year || '2025'}</span>
        </div>

        <h3
          style={{
            fontSize: '1.35rem',
            lineHeight: 1.25,
            marginBottom: '0.75rem',
            color: 'var(--primary)',
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: '0.92rem',
            color: 'var(--text)',
            lineHeight: 1.6,
            marginBottom: '1.25rem',
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Specs Tags */}
        {project.specs && project.specs.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.45rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            {project.specs.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.6rem',
                  backgroundColor: 'var(--tint)',
                  color: 'var(--primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Layers size={11} color="var(--accent)" />
                {spec}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;

