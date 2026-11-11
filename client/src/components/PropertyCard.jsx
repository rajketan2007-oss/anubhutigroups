import React from 'react';
import { MapPin, Bed, Bath, Maximize, ArrowRight, Tag } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const PropertyCard = ({ property }) => {
  const { openQuoteModal } = useModal();

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Property Cover Image */}
      <div
        style={{
          position: 'relative',
          height: '240px',
          overflow: 'hidden',
          backgroundColor: '#E2ECE9',
        }}
      >
        <img
          src={property.imageUrl}
          alt={property.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80';
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

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            right: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            className="badge badge-realtor"
            style={{ margin: 0, backdropFilter: 'blur(4px)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
          >
            {property.propertyType}
          </span>
          {property.status === 'Coming Soon' ? (
            <span
              className="badge badge-gold"
              style={{
                margin: 0,
                backdropFilter: 'blur(4px)',
                backgroundColor: 'var(--accent)',
                color: 'var(--primary)',
                fontWeight: 800,
                letterSpacing: '0.05em',
              }}
            >
              COMING SOON
            </span>
          ) : (
            <span
              className="badge badge-gold"
              style={{ margin: 0, backdropFilter: 'blur(4px)', backgroundColor: 'var(--primary)', color: 'var(--white)', borderColor: 'var(--accent)' }}
            >
              {property.purpose === 'Rent' ? 'FOR LEASE' : 'FOR SALE'}
            </span>
          )}
        </div>

        {/* Price Floating Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            backgroundColor: 'rgba(31, 61, 54, 0.92)',
            color: 'var(--white)',
            padding: '0.4rem 0.9rem',
            borderRadius: 'var(--radius-md)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Tag size={14} color="var(--accent)" />
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#FAF7F2' }}>{property.price}</span>
        </div>
      </div>

      {/* Property Details */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>
          <MapPin size={14} color="var(--accent)" />
          <span>{property.location}, {property.city}</span>
        </div>

        <h3
          style={{
            fontSize: '1.25rem',
            lineHeight: 1.3,
            marginBottom: '0.75rem',
            color: 'var(--primary)',
          }}
        >
          {property.title}
        </h3>

        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text)',
            lineHeight: 1.6,
            marginBottom: '1.25rem',
            flex: 1,
          }}
        >
          {property.description}
        </p>

        {/* Property Metrics: BHK, Area, Bath */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem',
            padding: '0.75rem 0',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '1.25rem',
            fontSize: '0.82rem',
            color: 'var(--primary)',
            fontWeight: 600,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Bed size={15} color="var(--accent)" />
            <span>{property.bhk}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Maximize size={15} color="var(--accent)" />
            <span>{property.area}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Bath size={15} color="var(--accent)" />
            <span>{property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'Available'}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          className="btn btn-outline btn-sm"
          style={{ width: '100%', borderColor: 'var(--primary)', minHeight: '44px' }}
          onClick={() => openQuoteModal('Realtor')}
        >
          <span>{property.status === 'Coming Soon' ? 'Pre-Register / Priority Enquiry' : 'Inquire & Schedule Site Visit'}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;

