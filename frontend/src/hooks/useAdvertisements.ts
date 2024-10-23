import { useEffect, useState, useRef } from 'react';
import { getAdvertisements } from '../services/advertisementsService';
import { Advertisement } from '../types';

interface UseAdvertisementsProps {
  currentPage: number;
  perPage: number;
}

function useAdvertisements({ currentPage, perPage }: UseAdvertisementsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      try {
        const response = await getAdvertisements(
          currentPage,
          perPage,
          abortControllerRef.current.signal,
        );

        if (response) {
          setAdvertisements(response.data);
          setTotalPages(response.pages);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            return;
          }

          setError(err);
        } else {
          console.error('Unknown error type:', err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvertisements();
  }, [currentPage, perPage]);

  return { advertisements, totalPages, isLoading, error };
}

export default useAdvertisements;
