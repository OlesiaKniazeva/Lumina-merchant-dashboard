import api from './axiosConfig';
import { Order } from '../types';

export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrderById = async (id: string) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with id ${id}:`, error);
    throw error;
  }
};

export const createOrder = async (order: Order) => {
  try {
    const response = await api.post('/orders', order);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrder = async (id: string, order: Order) => {
  try {
    const response = await api.put(`/orders/${id}`, order);
    return response.data;
  } catch (error) {
    console.error(`Error updating order with id ${id}:`, error);
    throw error;
  }
};

export const patchOrder = async (id: string, order: Order) => {
  try {
    const response = await api.patch(`/orders/${id}`, order);
    return response.data;
  } catch (error) {
    console.error(`Error patching order with id ${id}:`, error);
    throw error;
  }
};

export const deleteOrder = async (id: string) => {
  try {
    await api.delete(`/orders/${id}`);
    // console.log(`Order with id ${id} deleted`);
  } catch (error) {
    console.error(`Error deleting order with id ${id}:`, error);
    throw error;
  }
};
