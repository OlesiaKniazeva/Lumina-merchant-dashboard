import { useState, useEffect } from 'react';

function useSearchInput(initialValue: string = '') {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  return {
    query,
    setQuery,
  };
}

export default useSearchInput;
