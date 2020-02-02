import { useEffect, useState } from 'react';
import { useShop } from '../store';
import { Spinner } from '../components/Shared';
import Layout from '../components/Layout';
import Banner from '../components/Home/Banner';
import ProductList from '../components/Shared/Products/ProductList';
import SkeletonGrid from '../components/Shared/Loader/SkeletonGrid';
import Categories from '../components/Home/Categories';

const Home = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const {
    isLoading,
    products,
    loadProducts,
    hasLoadMore,
    loadMore
  } = useShop();

  useEffect(() => {
    products.length === 0 && loadProducts();
  }, []);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await loadMore();
    setIsLoadingMore(false);
  };

  return (
    <>
      <Layout>
        <Banner />
        <div className="container">
          <div className="heading">Shop Categories</div>
          <Categories />
          <div className="heading">Product Overview</div>
          {isLoading ? (
            <SkeletonGrid number={20} />
          ) : (
            <>
              <ProductList products={products} />
              {isLoadingMore && (
                <div className="loading-wrapper">
                  <Spinner
                    color={'var(--color-primary)'}
                    width={80}
                    height={80}
                  />
                </div>
              )}
              {hasLoadMore && (
                <div className="load-more">
                  <button className="btn" onClick={handleLoadMore}>
                    Load More
                  </button>
                </div>
              )}
            </>
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
