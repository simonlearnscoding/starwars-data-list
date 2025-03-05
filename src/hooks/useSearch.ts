import { useSearchParams } from 'react-router-dom';
// handle the search query by getting them from the URL
// I am using the url as a state management tool here
// so if someone shares a link he can share it with the query
const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const setSearchQuery = (query: string) => {
    setSearchParams({ q: query });
  };
  return { searchQuery, setSearchQuery };
};

export default useSearch;
