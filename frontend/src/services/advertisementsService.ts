import api from './axiosConfig';
import { Advertisement } from '@/types';
import axios from 'axios';

function buildAdvertisementsUrl(params: {
  page: number;
  perPage: number;
  searchTerm?: string;
}): string {
  const { page, perPage, searchTerm } = params;

  const searchParams = new URLSearchParams();

  searchParams.append('_page', String(page));
  searchParams.append('_limit', String(perPage));

  if (searchTerm) {
    searchParams.append('name_like', searchTerm);
  }

  return `/advertisements?${searchParams.toString()}`;
}

export async function getAdvertisements(
  page: number = 1,
  perPage: number = 10,
  searchTerm?: string,
  signal?: AbortSignal,
) {
  try {
    const url = buildAdvertisementsUrl({ page, perPage, searchTerm });
    const response = await api.get(url, { signal });

    const pages = response.headers['x-total-count']
      ? Math.ceil(Number(response.headers['x-total-count']) / perPage)
      : 1;

    return {
      pages,
      data: response.data,
    };
  } catch (error) {
    if (axios.isCancel(error)) {
      return;
    }
    console.error('Error fetching advertisements:', error);
    throw error;
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
