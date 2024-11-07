import api from './axiosConfig';
import { Order } from '@/types';
import axios from 'axios';

export async function getOrders(
  page: number = 1,
  perPage: number = 10,
  signal?: AbortSignal,
) {
  try {
    const response = await api.get<Order[]>(
      `/orders?_page=${page}&_limit=${perPage}`,
      { signal },
    );

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
