import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import baseURL from "../utils/baseRL";
import Banner from "../components/Home/Banner";
import ProductList from "../components/Shared/Products/ProductList";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(`${baseURL}/api/products`);
      const { products } = await response.json();
      setProducts(products);
    }
    fetchProducts();
  }, []);

  return (
    <>
      <Layout>
        <Banner />
        <div className="container">
          <div className="heading">Product Overview</div>
          <ProductList products={products} />
          <div className="load-more">
            <button className="btn"> Load More </button>
          </div>
        </div>
      </Layout>
      <style jsx>
        {`
          .container {
            max-width: 1200px;
            margin: 2rem auto;
          }

          .heading {
            padding: 1.5rem;
            font-weight: 700;
            font-size: 36px;
            line-height: 1.1;
            text-transform: uppercase;
          }

          .load-more {
            width: 100%;
            display: flex;
            justify-content: center;
            margin: 5rem 0;
          }

          .load-more .btn {
            background-color: #fff;
            color: var(--color-primary);
            font-size: 2rem;
            width: 25rem;
            height: 6rem;
            line-height 6rem;
            border-radius: 5rem;
            border: 1px solid var(--color-primary);
            cursor: pointer;
          }

          .load-more .btn:focus {
            outline: none;
          }

          .load-more .btn:hover {
            background-color: var(--color-primary);
            color: #fff;
          }
        `}
      </style>
    </>
  );
};

export default Home;
