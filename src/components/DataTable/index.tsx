import DataTableUI from './DataTableUI';
import usePeopleLogic from '@/hooks/usePeople';
import ErrorState from './ErrorState';

const DataTable = () => {
  console.log('DataTable');
  const { people, status, error, next, handleRefetch } = usePeopleLogic();

  if (status === 'failed') {
    return <ErrorState error={error || ''} onRetry={handleRefetch} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Star Wars Characters</h1>
      </div>

      <DataTableUI data={people} isLoading={status === 'loading'} />
    </div>
  );
};

export default DataTable;
