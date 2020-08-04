import { Category } from 'types';
import { catchError } from 'utils/catchError';
import apiClient from 'api/apiClient';

interface CategoriesData {
  categories: Category[];
}

const getCategories = async (): Promise<CategoriesData> => {
  try {
    const { data } = await apiClient.get(`/categories`);

    const categoriesData: CategoriesData = {
      categories: data.data.categories,
    };

    return categoriesData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const CategoryService = {
  getCategories,
};
