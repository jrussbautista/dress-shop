import React, { useEffect, useState } from 'react';
import { Product } from 'types';
import { ProductList, ErrorPage, ProductsSkeleton } from 'components/shared';
import { useRouter } from 'next/router';
import { ProductService } from 'services';

interface IParams {
  category?: string;
  sort?: string;
  keyword?: string;
}

export const SearchProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { query } = useRouter();
  const category = query.category as string;
  const keyword = query.keyword as string;
  const sort = query.sort as string;

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);

        let params: IParams = {};

        if (category) {
          params = { ...params, category };
        }
        if (sort) {
          params = { ...params, sort };
        }
        if (keyword) {
          params = { ...params, keyword };
        }

        const payload = { params };

        const { products } = await ProductService.fetchProducts(payload);
        setProducts(products);
        setIsLoading(false);
      } catch (error) {
        setError('Error in fetching products. Please try again.');
      }
    };
    getProducts();
  }, [category, sort, keyword]);

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <>
      <div className="container">
        {isLoading ? (
          <ProductsSkeleton number={20} />
        ) : (
          <>
            {products.length === 0 ? (
              <div className="message">No products found. Try searching for other keyword.</div>
            ) : (
              <ProductList products={products} />
            )}
          </>
        )}
      </div>
      <style jsx>{`
        .container {
          padding: 0 1.5rem;
        }

        .message {
          padding: 1rem;
          text-align: center;
          font-size: 2rem;
        }
      `}</style>
    </>
  );
};
