import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../components/Layout';
import ProductList from '../components/Shared/Products/ProductList';
import baseURL from '../utils/baseURL';
import SkeletonGrid from '../components/Shared/Loader/SkeletonGrid';
import TabCategory from '../components/Category/TabCategory';
import Filter from '../components/Category/Filter';

const Category = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { category, sortByPrice, keyword } = router.query;

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const payload = { params: { category, price: sortByPrice, keyword } };
        const { data } = await axios.get(`${baseURL}/api/category`, payload);
        setProducts(data.products);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category, sortByPrice, keyword]);

  const handleTabChange = selected => {
    if (keyword) {
      if (sortByPrice) {
        Router.push(
          `/category?category=${selected}&sortByPrice=${sortByPrice}&keyword=${keyword}`
        );
      } else {
        Router.push(`/category?category=${selected}&keyword=${keyword}`);
      }
    } else {
      if (sortByPrice) {
        Router.push(
          `/category?category=${selected}&sortByPrice=${sortByPrice}`
        );
      } else {
        Router.push(`/category?category=${selected}`);
      }
    }
  };

  const handleFilterChange = selected => {
    if (keyword) {
      Router.push(
        `/category?category=${category}&sortByPrice=${selected}&keyword=${keyword}`
      );
    } else {
      Router.push(`/category?category=${category}&sortByPrice=${selected}`);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="sort-container">
          <TabCategory active={category} onChangeTab={handleTabChange} />
          <Filter handleChange={handleFilterChange} active={sortByPrice} />
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
          align-items: center;
          justify-content: space-between;
        }
      `}</style>
    </Layout>
  );
};

export default Category;
