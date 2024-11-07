import api from './axiosConfig';
import { Advertisement } from '@/types';
import axios from 'axios';

export async function getAdvertisements(
  page: number = 1,
  perPage: number = 10,
  searchTerm?: string,
  signal?: AbortSignal,
) {
  try {
    let url = `/advertisements?_page=${page}&_limit=${perPage}`;

    if (searchTerm) {
      url += `&name_like=${encodeURIComponent(searchTerm)}`;
    }

    const response = await api.get(url, { signal });

    const pages =
      response.headers['x-total-count'] / perPage > 0
        ? Math.ceil(response.headers['x-total-count'] / perPage)
        : 1;
    return {
      pages: pages,
      data: response.data,
    };
  } catch (error) {
    if (axios.isCancel(error)) {
      // console.log('Request canceled', error.message);
    } else {
      console.error('Error fetching advertisements:', error);
      throw error;
    }
  }
}

export async function getAdvertisementById(id: string, signal?: AbortSignal) {
  const url = `/advertisements/${id}`;
  try {
    const response = await api.get(url, { signal });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      // console.log('Request canceled', error.message);
    } else {
      console.error(`Error fetching advertisement with id ${id}:`, error);
      throw error;
    }
  }
}

export type CreateAdvertisementDTO = Omit<Advertisement, 'id'>;

export async function createAdvertisement(data: CreateAdvertisementDTO) {
  try {
    const response = await api.post('/advertisements', data);
    return response.data;
  } catch (error) {
    console.error('Error creating advertisement:', error);
    throw error;
  }
}

export async function updateAdvertisement(
  id: string,
  advertisement: Partial<Advertisement>,
) {
  try {
    const response = await api.patch(`/advertisements/${id}`, advertisement);
    return response.data;
  } catch (error) {
    console.error(`Error updating advertisement with id ${id}:`, error);
    throw error;
  }
}

export async function deleteAdvertisement(id: string) {
  try {
    await api.delete(`/advertisements/${id}`);
    // console.log(`Advertisement with id ${id} deleted`);
  } catch (error) {
    console.error(`Error deleting advertisement with id ${id}:`, error);
    throw error;
  }
}

export async function uploadImage(formData: FormData) {
  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}
