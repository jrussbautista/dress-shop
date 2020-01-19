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
  const { category, sortByPrice } = useRouter().query;

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const payload = { params: { category, price: sortByPrice } };
        const { data } = await axios.get(`${baseURL}/api/category`, payload);
        setProducts(data.products);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category, sortByPrice]);

  const handleTabChange = selected => {
    if (sortByPrice) {
      Router.push(`/category?category=${selected}&sortByPrice=${sortByPrice}`);
    } else {
      Router.push(`/category?category=${selected}`);
    }
  };

  const handleFilterChange = selected => {
    Router.push(`/category?category=${category}&sortByPrice=${selected}`);
  };

  return (
    <Layout>
      <div className="container">
        <div className="sort-container">
          <TabCategory active={category} onChangeTab={handleTabChange} />
          <Filter handleChange={handleFilterChange} active={sortByPrice} />
        </div>
        {isLoading ? (
          <SkeletonGrid number={4} />
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
