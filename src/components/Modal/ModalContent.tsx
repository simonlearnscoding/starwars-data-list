import React from 'react';
import { Planet } from '@/types';

interface ModalContentProps {
  planet: Planet;
}

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <p className="flex items-center gap-2">
    <span className="font-semibold text-gray-800">{label}</span>
    <span className="text-gray-600">{value}</span>
  </p>
);

const ModalContent: React.FC<ModalContentProps> = ({ planet }) => {
  const { name, diameter, climate, population } = planet;

  return (
    <div onClick={(e) => e.stopPropagation()} aria-label={`Details about ${name}`}>
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{name}</h2>

      {/* Info */}
      <div className="space-y-3 ">
        <InfoRow label="🌍 Diameter:" value={diameter} />
        <InfoRow label="☁ Climate:" value={climate} />
        <InfoRow label="👥 Population:" value={population} />
      </div>
    </div>
  );
};

export default ModalContent;
