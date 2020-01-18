import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../components/Layout';
import ProductList from '../components/Shared/Products/ProductList';
import baseURL from '../utils/baseURL';
import SkeletonGrid from '../components/Shared/Loader/SkeletonGrid';
import TabCategory from '../components/Category/TabCategory';

const Category = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { category } = useRouter().query;

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const payload = { params: { category } };
        const { data } = await axios.get(`${baseURL}/api/category`, payload);
        setProducts(data.products);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category]);

  const handleTabChange = selected => {
    Router.push(`/category?category=${selected}`);
  };

  return (
    <Layout>
      <div className="container">
        <div className="tab-container">
          <TabCategory active={category} onChangeTab={handleTabChange} />
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

        .tab-container {
          margin: 4rem 0;
        }
      `}</style>
    </Layout>
  );
};

export default Category;
