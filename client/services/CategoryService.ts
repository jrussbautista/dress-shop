import { Category } from '@/types';
import apiClient from '@/utils/apiClient';
import { catchError } from '@/utils/catchError';

const getCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await apiClient.get(`/categories`);

    return data.data;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const CategoryService = {
  getCategories,
};
