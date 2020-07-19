import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SearchFilter, SearchTabCategory } from '../features/Search';
import { ProductList, ProductsSkeleton, ErrorPage } from '../shared';
import { ProductService } from '../services/productService';
import { Product } from '../types';

interface IParams {
  category: string;
  sort: string;
  keyword: string;
}

const Search: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { query, pathname } = useRouter();
  let { category, sort, keyword } = query;
  category = (category as string) || '';
  sort = (sort as string) || '';

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);

        let params: IParams | {} = {};

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

  const handleTabChange = (selected: string) => {
    Router.push({ pathname, query: { ...query, category: selected } });
  };

  const handleFilterChange = (selected: string) => {
    Router.push({ pathname, query: { ...query, sort: selected } });
  };

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <>
      <div className="container">
        <div className="sort-container">
          <SearchTabCategory active={category} onChangeTab={handleTabChange} />
          <SearchFilter handleChange={handleFilterChange} active={sort} />
        </div>
        {isLoading ? (
          <ProductsSkeleton number={20} />
        ) : (
          <ProductList products={products} />
        )}
      </div>
      <style jsx>{`
        .container {
          max-width: 120rem;
          margin: 3rem auto;
        }

        .sort-container {
          margin: 4rem 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.03);
          padding: 1rem;
          border-radius: 4px;
        }

        @media only screen and (max-width: 600px) {
          .sort-container {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default Search;
