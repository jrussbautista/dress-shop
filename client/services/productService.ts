import { Product } from 'types';
import { catchError } from 'utils/catchError';
import apiClient from 'api/apiClient';

interface ProductsData {
  products: Product[];
  total: number;
}

interface ProductData {
  product: Product;
  relatedProducts: Product[];
}

type ProductPayload = { params: unknown };

const fetchProducts = async (payload?: ProductPayload): Promise<ProductsData> => {
  try {
    const url = `/products`;
    const { data } = await apiClient.get(url, payload);

    const productsData: ProductsData = {
      products: data.data.products,
      total: data.data.total,
    };
    return productsData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const fetchProduct = async (id: string): Promise<ProductData> => {
  try {
    const url = `/products/${id}`;
    const { data } = await apiClient.get(url);

    const productData: ProductData = {
      product: data.data.product,
      relatedProducts: data.data.relatedProducts,
    };
    return productData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const ProductService = {
  fetchProducts,
  fetchProduct,
};
