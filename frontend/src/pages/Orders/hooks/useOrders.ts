import { useState, useEffect, useRef } from 'react';
import { getOrders } from '@/services/ordersService';
import type { Order, OrderStatusValue } from '@/types/index';

interface UseOrdersProps {
  page: number;
  perPage: number;
  statuses?: OrderStatusValue[];
  sortOrder: 'none' | 'asc' | 'desc';
}

export function useOrders({
  page,
  perPage,
  statuses,
  sortOrder,
}: UseOrdersProps) {
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
          statuses,
          sortOrder !== 'none' ? sortOrder : undefined,
        );
        if (response) {
          setOrders(response.data);
          setTotalPages(response.pages);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [page, perPage, statuses, sortOrder]);

  return { orders, totalPages, loading, error };
}
