import axios from 'axios';
import { API_URL } from '../utils/constants';
import { Category } from '../types';

interface CategoriesData {
  categories: Category[];
}

const getCategories = async (): Promise<CategoriesData> => {
  const { data } = await axios.get(`${API_URL}/categories`);

  const categoriesData: CategoriesData = {
    categories: data.data.categories,
  };

  return categoriesData;
};

export const CategoryService = {
  getCategories,
};
