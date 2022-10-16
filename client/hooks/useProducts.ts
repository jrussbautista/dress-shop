import { useSWRInfinite } from 'swr';

import ProductService from '@/services/ProductService';
import { Product } from '@/types';

const PAGE_SIZE = 12;

const useProducts = (initialData: Product[]) => {
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index) => `/api/products?page=${index + 1}`,
    (url: string) => {
      const currentPage = url.split('page=')[1];
      return ProductService.getProducts({ page: currentPage, limit: PAGE_SIZE });
    },
    { initialData: [initialData] }
  );

  const initialProducts: Product[] = [];

  const products = data ? initialProducts.concat(...data) : [];

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  const loadMore = () => {
    setSize(size + 1);
  };

  return {
    products,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
    loadMore,
  };
};

export default useProducts;
