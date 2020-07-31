import axios from 'axios';
import { API_URL } from 'utils/constants';
import { Category } from 'types';
import { catchError } from 'utils/catchError';

interface CategoriesData {
  categories: Category[];
}

const getCategories = async (): Promise<CategoriesData> => {
  try {
    const { data } = await axios.get(`${API_URL}/categories`);

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
