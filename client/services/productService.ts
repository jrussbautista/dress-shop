import axios from 'axios';
import { API_URL } from '../utils/constants';
import { Product } from '../types';

type ProductsData = {
  products: Product[];
  total: number;
};

type ProductData = {
  product: Product;
  relatedProducts: Product[];
};

const fetchProducts = async (payload?: Object): Promise<ProductsData> => {
  const url = `${API_URL}/products`;
  const { data } = await axios.get(url, payload);

  const productsData: ProductsData = {
    products: data.data.products,
    total: data.data.total,
  };
  return productsData;
};

export const fetchProduct = async (id: string): Promise<ProductData> => {
  const url = `${API_URL}/products/${id}`;
  const { data } = await axios.get(url);

  const productData: ProductData = {
    product: data.data.product,
    relatedProducts: data.data.relatedProducts,
  };
  return productData;
};

export const ProductService = {
  fetchProducts,
  fetchProduct,
};
