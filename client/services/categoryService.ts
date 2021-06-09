import { Category } from 'types';
import { catchError } from 'utils/catchError';
import apiClient from 'utils/apiClient';

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
