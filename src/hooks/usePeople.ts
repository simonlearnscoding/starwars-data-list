import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchPeople } from '../store/peopleSlice';

/***
This is a custom hook that handles fetching Star Wars people data.
It fetches people based on a search query and handles infinite scrolling.
***/
const usePeopleLogic = (search?: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { people, status, error, next } = useSelector((state: RootState) => state.people);

  // Fetch people whenever the search query changes
  useEffect(() => {
    // early return on loading to prevent duplicate requests
    if (status === 'loading') return;

    dispatch(fetchPeople({ limit: 20, search }));
  }, [dispatch, search]);

  // Load more results when the user scrolls to the bottom
  const handleLoadMore = () => {
    if (next && status !== 'loading') {
      dispatch(fetchPeople({ next, search }));
    }
  };

  const handleRefetch = () => {
    dispatch(fetchPeople({ limit: 20, search }));
  };

  return {
    people,
    status,
    handleRefetch,
    error,
    next,
    handleLoadMore,
  };
};

export default usePeopleLogic;
