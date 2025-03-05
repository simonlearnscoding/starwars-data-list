import React, { useEffect } from 'react';
import { X } from '@phosphor-icons/react';

type ModalOverlayProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalOverlay: React.FC<ModalOverlayProps> = ({ isVisible, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-testid="planet-popup"
      onClick={onClose}
      className={`fixed inset-0 p-4 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 scale-100">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} weight="bold" /> {/* Phosphor X icon */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalOverlay;
