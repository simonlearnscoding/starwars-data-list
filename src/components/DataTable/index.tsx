import { useRef } from 'react';
import DataTableUI from './DataTableUI';
import SearchInput from './SearchInput';
import usePeopleLogic from '@/hooks/usePeople';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useSearch from '@/hooks/useSearch';
import useDebounce from '@/hooks/useDebounce';
import ErrorState from './ErrorState';

const DataTable = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const debouncedSearch = useDebounce(searchQuery, 500);
  const { people, status, error, next, handleLoadMore, handleRefetch } =
    usePeopleLogic(debouncedSearch);
  const loadMoreRef = useRef<HTMLTableRowElement>(null);

  // I want to filter the people that are displayed
  // based on the search query entered by the user.
  // This way I can have instant UI updates on search for a cleaner user experience
  // while also fetching more data when the user scrolls to the bottom of the page.
  const filteredPeople = searchQuery
    ? people.filter((person) => person.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : people;

  useInfiniteScroll(
    loadMoreRef,
    () => {
      // Set up infinite scrolling only when there is no active search query.
      if (!debouncedSearch && next && status !== 'loading') {
        handleLoadMore();
      }
    },
    { threshold: 0.1 },
  );

  if (status === 'failed') {
    return <ErrorState error={error || ''} onRetry={handleRefetch} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Star Wars Characters</h1>
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
      </div>

      <DataTableUI
        data={filteredPeople}
        loadMoreRef={loadMoreRef}
        isLoading={status === 'loading'}
        highlight={searchQuery}
      />
    </div>
  );
};

export default DataTable;
