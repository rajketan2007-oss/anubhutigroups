import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteModalDivision, setQuoteModalDivision] = useState('General');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState({ imageUrl: '', caption: '' });

  const openQuoteModal = (division = 'General') => {
    setQuoteModalDivision(division);
    setQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setQuoteModalOpen(false);
  };

  const openLightbox = (imageUrl, caption = '') => {
    setLightboxData({ imageUrl, caption });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        quoteModalOpen,
        quoteModalDivision,
        openQuoteModal,
        closeQuoteModal,
        lightboxOpen,
        lightboxData,
        openLightbox,
        closeLightbox,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

