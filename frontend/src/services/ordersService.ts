import api from './axiosConfig';
import { Order, OrderStatusValue } from '@/types/index';
import axios from 'axios';

// Helper function to build the query string
function buildOrdersUrl(params: {
  page: number;
  perPage: number;
  statuses?: OrderStatusValue[];
  sortOrder?: 'none' | 'asc' | 'desc';
}): string {
  const { page, perPage, statuses, sortOrder } = params;

  // Create URLSearchParams directly
  const searchParams = new URLSearchParams();

  // Add pagination params
  searchParams.append('_page', String(page));
  searchParams.append('_limit', String(perPage));

  // Only add sorting if it's not 'none'
  if (sortOrder && sortOrder !== 'none') {
    searchParams.append('_sort', 'total');
    searchParams.append('_order', sortOrder);
  }

  // Add status filters if provided
  if (statuses && statuses.length > 0) {
    statuses.forEach((status) => {
      searchParams.append('status', String(status));
    });
  }

  // Combine base path with search params
  return `/orders?${searchParams.toString()}`;
}

export async function getOrders(
  page: number = 1,
  perPage: number = 10,
  signal?: AbortSignal,
  statuses?: OrderStatusValue[],
  sortOrder?: 'asc' | 'desc',
) {
  try {
    const url = buildOrdersUrl({ page, perPage, statuses, sortOrder });
    const response = await api.get<Order[]>(url, { signal });

    const pages = response.headers['x-total-count']
      ? Math.ceil(Number(response.headers['x-total-count']) / perPage)
      : 1;

    return {
      data: response.data,
      pages,
    };
  } catch (error) {
    if (axios.isCancel(error)) {
      return;
    }
    console.error('Error fetching orders:', error);
    throw error;
  }
}

export async function getOrderById(id: string) {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with id ${id}:`, error);
    throw error;
  }
}

export async function createOrder(order: Order) {
  try {
    const response = await api.post('/orders', order);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function updateOrder(id: string, order: Order) {
  try {
    const response = await api.put(`/orders/${id}`, order);
    return response.data;
  } catch (error) {
    console.error(`Error updating order with id ${id}:`, error);
    throw error;
  }
}

export async function patchOrder(id: string, order: Order) {
  try {
    const response = await api.patch(`/orders/${id}`, order);
    return response.data;
  } catch (error) {
    console.error(`Error patching order with id ${id}:`, error);
    throw error;
  }
}

export async function deleteOrder(id: string) {
  try {
    await api.delete(`/orders/${id}`);
    // console.log(`Order with id ${id} deleted`);
  } catch (error) {
    console.error(`Error deleting order with id ${id}:`, error);
    throw error;
  }
}
