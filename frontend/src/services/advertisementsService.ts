import api from './axiosConfig';
import { Advertisement } from '../types';
import axios from 'axios';

export const getAdvertisements = async (
  page: number = 1,
  perPage: number = 10,
  signal?: AbortSignal,
) => {
  try {
    const response = await api.get(
      `/advertisements?_page=${page}&_per_page=${perPage}`,
      { signal },
    );
    // console.log("All data in response::::", response.data);
    return {
      pages: response.data.pages,
      data: response.data.data,
    };
  } catch (error) {
    if (axios.isCancel(error)) {
      // console.log('Request canceled', error.message);
    } else {
      console.error('Error fetching advertisements:', error);
      throw error;
    }
  }
};

export const getAdvertisementById = async (id: string) => {
  try {
    const response = await api.get(`/advertisements/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching advertisement with id ${id}:`, error);
    throw error;
  }
};

export const createAdvertisement = async (advertisement: Advertisement) => {
  try {
    const response = await api.post('/advertisements', advertisement);
    return response.data;
  } catch (error) {
    console.error('Error creating advertisement:', error);
    throw error;
  }
};

export const updateAdvertisement = async (
  id: string,
  advertisement: Advertisement,
) => {
  try {
    const response = await api.put(`/advertisements/${id}`, advertisement);
    return response.data;
  } catch (error) {
    console.error(`Error updating advertisement with id ${id}:`, error);
    throw error;
  }
};

export const patchAdvertisement = async (
  id: string,
  advertisement: Advertisement,
) => {
  try {
    const response = await api.patch(`/advertisements/${id}`, advertisement);
    return response.data;
  } catch (error) {
    console.error(`Error patching advertisement with id ${id}:`, error);
    throw error;
  }
};

export const deleteAdvertisement = async (id: string) => {
  try {
    await api.delete(`/advertisements/${id}`);
    // console.log(`Advertisement with id ${id} deleted`);
  } catch (error) {
    console.error(`Error deleting advertisement with id ${id}:`, error);
    throw error;
  }
};
