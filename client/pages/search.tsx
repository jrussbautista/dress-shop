import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Product } from 'types';
import { SearchFilter, SearchCategory } from 'components/search';
import { SearchBar, Container } from 'components/ui';
import { Meta, MobileBottomMenu } from 'components/core';
import { ProductList, ProductListSkeleton } from 'components/product';
import { ProductService } from 'services';
import styles from 'styles/Search.module.css';

interface IParams {
  category?: string;
  sort?: string;
  keyword?: string;
}

const Search: React.FC = () => {
  const { query, pathname } = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleTabChange = (selected: string) => {
    Router.push({ pathname, query: { ...query, category: selected } });
  };

  const handleFilterChange = (selected: string) => {
    Router.push({ pathname, query: { ...query, sort: selected } });
  };

  const handleSearchSubmit = (searchText: string) => {
    Router.push(`/search?keyword=${searchText}`);
  };

  return (
    <>
      <Meta title="Search" />
      <Container>
        <div className={styles.searchBarContainer}>
          <SearchBar onSubmit={handleSearchSubmit} style={{ width: '100%' }} isFocus />
        </div>
        <div className={styles.sortContainer}>
          <SearchCategory active={category} onChangeTab={handleTabChange} />
          <SearchFilter handleChange={handleFilterChange} active={sort} />
        </div>
        {isLoading ? (
          <ProductListSkeleton number={20} />
        ) : (
          <>
            {products.length > 0 ? (
              <ProductList products={products} />
            ) : (
              <div className={styles.message}>
                No products found. Try searching for other keyword.
              </div>
            )}
          </>
        )}
        <MobileBottomMenu />
      </Container>
    </>
  );
};

export default Search;
