import { useState, useEffect, useRef } from 'react';
import { getOrders } from '@/services/ordersService';
import type { Order } from '@/types';

interface UseOrdersProps {
  page: number;
  perPage: number;
}

export function useOrders({ page, perPage }: UseOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      try {
        setLoading(true);
        const response = await getOrders(
          page,
          perPage,
          abortControllerRef.current.signal,
        );
        if (response) {
          setOrders(response.data);
          setTotalPages(response.pages);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [page, perPage]);

  return { orders, totalPages, loading, error };
}
