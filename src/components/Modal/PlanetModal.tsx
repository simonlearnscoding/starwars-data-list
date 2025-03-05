// PlanetModal.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'; // <-- Your custom hook
import ModalOverlay from './ModalOverlay';
import ModalContent from './ModalContent';
import NotFoundModal from './NotFoundModal';
import ErrorModal from './ErrorModal';
import SkeletonLoader from './SkeletonLoader';

interface Planet {
  name: string;
  diameter: string;
  climate: string;
  population: string;
}

const PlanetModal: React.FC = () => {
  const { planetId } = useParams<{ planetId: string }>();
  const navigate = useNavigate();

  // Construct your SWAPI URL (if planetId is present)
  const url = planetId ? `https://swapi.dev/api/planets/${planetId}/` : '';

  // Use your custom hook
  const { data: planet, isLoading, isError, error, refetch } = useFetch<Planet>(url);

  const handleClose = () => {
    navigate(-1);
  };

  if (!planetId) {
    return (
      <ModalOverlay onClose={handleClose} isVisible={true}>
        <NotFoundModal />
      </ModalOverlay>
    );
  }

  const renderContent = () => {
    if (isLoading) return <SkeletonLoader />;

    if (isError) {
      // The error may be an AxiosError object
      const status = error?.response?.status;
      if (status === 404) {
        return <NotFoundModal />;
      }
      return (
        <ErrorModal
          errorMessage={error?.message || 'An error occurred'}
          onRetry={refetch}
          onClose={handleClose}
        />
      );
    }

    return planet ? <ModalContent planet={planet} /> : null;
  };

  return (
    <ModalOverlay isVisible={true} onClose={handleClose}>
      {renderContent()}
    </ModalOverlay>
  );
};

export default PlanetModal;
