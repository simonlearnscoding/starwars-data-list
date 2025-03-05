import React from 'react';

type ErrorModalProps = {
  errorMessage: string;
  onRetry?: () => void;
  onClose: () => void;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage, onRetry, onClose }) => (
  <div>
    <p className="text-red-500 mb-4">{errorMessage}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mr-4"
      >
        Retry
      </button>
    )}
    <button
      onClick={onClose}
      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
    >
      Close
    </button>
  </div>
);

export default ErrorModal;
