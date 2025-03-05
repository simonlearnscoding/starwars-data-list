import { useState, useEffect } from 'react';
import { RedaxiosError } from '@/types';
import axios from 'redaxios';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: RedaxiosError | null;
  refetch: () => void;
}

/**
 This is a reusable hook that fetches data from a URL using Axios.
Initially, I thought about adding RTK Query to my project, but it is too much boilerplate
for this small project. Instead, I would have used react Query library for this,
as it is more lightweight and does what I'd need it to do (caching),
but I wrote a custom fetching hook instead because I wasn't sure if I was allowed to use this dependency for this assignment
 */

function useFetch<T = unknown>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<RedaxiosError | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await axios.get<T>(url);
      setData(response.data);
    } catch (err) {
      setIsError(true);
      setError(err as RedaxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!url) return;
    fetchData();
  }, [url]);

  return { data, isLoading, isError, error, refetch: fetchData };
}

export default useFetch;
