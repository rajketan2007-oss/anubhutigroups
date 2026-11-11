import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '917908880693';
  const textMessage = encodeURIComponent(
    'Hello Anubhuti Group, I would like to inquire about your Construction, Realty, or Interior services.'
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${textMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-whatsapp"
      aria-label="Chat with Anubhuti Group on WhatsApp"
    >
      <MessageCircle size={26} />
      <span className="btn-whatsapp-tooltip">Chat with us on WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;

