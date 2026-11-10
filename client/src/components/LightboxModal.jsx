import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const LightboxModal = () => {
  const { lightboxOpen, lightboxData, closeLightbox } = useModal();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, closeLightbox]);

  if (!lightboxOpen) return null;

  return (
    <div
      className="lightbox-modal"
      onClick={closeLightbox}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="modal-close-btn"
        style={{
          position: 'absolute',
          top: '25px',
          right: '25px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'var(--white)',
        }}
        onClick={closeLightbox}
        aria-label="Close preview"
      >
        <X size={22} />
      </button>

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={lightboxData.imageUrl} alt={lightboxData.caption || 'Enlarged project preview'} />
        {lightboxData.caption && (
          <div className="lightbox-caption">{lightboxData.caption}</div>
        )}
      </div>
    </div>
  );
};

export default LightboxModal;

