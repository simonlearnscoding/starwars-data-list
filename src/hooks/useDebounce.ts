import { useState, useEffect } from 'react';

/*** This is a custom hook I wrote that will debounce any value passed to it.
 It will return the debounced value after the delay has passed.
 I wrote this function because as the user types in the search input,
 I don't want to make a request for every keystroke.
 Therefore I'd rather wait until the user has stopped typing for a while
 and then make the request.
 ***/

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
