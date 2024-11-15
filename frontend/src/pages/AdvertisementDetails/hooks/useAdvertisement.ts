import { useEffect, useRef, useState } from 'react';
import {
  getAdvertisementById,
  updateAdvertisement,
} from '@services/advertisementsService';
import { Advertisement } from '@/types';
import { useParams } from 'react-router-dom';

function useAdvertisement() {
  const { id } = useParams();
  const [advertisement, setAdvertisement] = useState<Advertisement | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchAdvertisementDetails = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      try {
        if (!id) {
          console.error('Advertisement ID is required, error in your code');
          return;
        }

        const response = await getAdvertisementById(
          id,
          abortControllerRef.current.signal,
        );

        if (response) {
          setAdvertisement(response);
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

    fetchAdvertisementDetails();
  }, [id]);

  const handleUpdate = async (updates: Partial<Advertisement>) => {
    try {
      await updateAdvertisement(id!, updates);
    } catch (error) {
      console.error('Error updating advertisement:', error);
      throw error;
    }
  };

  const refetch = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      const response = await getAdvertisementById(id);
      if (response) {
        setAdvertisement(response);
      }
    } catch (error) {
      console.error('Error refetching advertisement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { advertisement, isLoading, error, handleUpdate, refetch };
}

export default useAdvertisement;
