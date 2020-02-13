import axios from 'axios';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Filter from '../components/Search/Filter';
import TabCategory from '../components/Search/TabCategory';
import SkeletonGrid from '../components/Shared/Loader/SkeletonGrid';
import ProductList from '../components/Shared/Products/ProductList';
import baseURL from '../utils/baseURL';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { category, sort, keyword } = router.query;

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const payload = { params: { category, sort, keyword } };
        const { data } = await axios.get(`${baseURL}/api/products`, payload);
        setProducts(data.products);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category, sort, keyword]);

  const handleTabChange = selected => {
    if (keyword) {
      if (sort) {
        Router.push(
          `/search?category=${selected}&sort=${selected}&keyword=${keyword}`
        );
      } else {
        Router.push(`/search?category=${selected}&keyword=${keyword}`);
      }
    } else {
      if (sort) {
        Router.push(`/search?category=${selected}&sort=${sort}`);
      } else {
        Router.push(`/search?category=${selected}`);
      }
    }
  };

  const handleFilterChange = selected => {
    if (keyword) {
      Router.push(`/search?&sort=${selected}&keyword=${keyword}`);
    } else {
      Router.push(`/search?&sort=${selected}`);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="sort-container">
          <TabCategory active={category} onChangeTab={handleTabChange} />
          <Filter handleChange={handleFilterChange} active={sort} />
        </div>
        {isLoading ? (
          <SkeletonGrid number={20} />
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
    </Layout>
  );
};

export default Search;
