import React from 'react';

const NotFoundModal: React.FC = () => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4">404 - Not Found</h2>
      <p className="text-gray-600">The planet you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundModal;
