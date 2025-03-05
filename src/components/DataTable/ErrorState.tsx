const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="p-4 bg-red-100 text-red-700 rounded-lg max-w-2xl mx-auto mt-8">
    <h2 className="font-bold mb-2">Error Loading Data</h2>
    <p>{error || 'Unknown error occurred'}</p>
    <button
      onClick={onRetry}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);

export default ErrorState;
