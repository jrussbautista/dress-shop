import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import baseURL from "../utils/baseURL";
import Banner from "../components/Home/Banner";
import ProductList from "../components/Shared/Products/ProductList";
import Spinner from "../components/Shared/Spinner";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoadMore, setIsLoadMOre] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const payload = { params: { currentPage, pageSize: 10 } };
        const { data } = await axios.get(`${baseURL}/api/products`, payload);
        const newProducts = products.concat(data.products);
        setProducts(products.concat(data.products));
        setIsLoadingMore(false);
        //check if theres still a products to show
        const hasLoadMore = newProducts.length >= data.totalProducts;
        if (!hasLoadMore) {
          setIsLoadMOre(true);
        } else {
          setIsLoadMOre(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(page => page + 1);
    setIsLoadingMore(true);
  };

  return (
    <>
      <Layout>
        <Banner />
        <div className="container">
          <div className="heading">Product Overview</div>
          <ProductList products={products} />
          {isLoadingMore && (
            <div className="loading-wrapper">
              <Spinner color={"var(--color-primary)"} width={80} height={80} />
            </div>
          )}
          {isLoadMore && !isLoadingMore && (
            <div className="load-more">
              <button className="btn" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
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

          .loading-wrapper {
            width: 100%;
            text-align: center;
            padding: 2rem 0;
          }
        `}
      </style>
    </>
  );
};

export default Home;
