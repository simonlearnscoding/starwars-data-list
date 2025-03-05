import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchPeople } from '../store/peopleSlice';

const usePeopleLogic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { people, status, error, next } = useSelector((state: RootState) => state.people);

  useEffect(() => {
    if (status === 'loading') return;

    dispatch(fetchPeople({ limit: 20 }));
  }, [dispatch]);

  const handleRefetch = () => {
    dispatch(fetchPeople({ limit: 20 }));
  };

  return {
    people,
    status,
    handleRefetch,
    error,
    next,
  };
};

export default usePeopleLogic;
