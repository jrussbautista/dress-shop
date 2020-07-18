import { useEffect, useState } from 'react';
import { HomeBanner, HomeCategories } from '../features/Home';
import { ProductList, ProductsSkeleton, Spinner } from '../shared';
import { useShop } from '../store';
import { GetServerSideProps } from 'next';
import { BannerService, CategoryService } from '../services';
import { Banner, Category } from '../types';
import { useScrollRestoration } from '../hooks';

interface Props {
  banners: Banner[];
  categories: Category[];
}

const Home: React.FC<Props> = ({ banners, categories }) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { isLoading, products, loadProducts, hasLoadMore } = useShop();

  useScrollRestoration();

  useEffect(() => {
    //load only if products is empty
    products.length === 0 && loadProducts();
  }, []);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await loadProducts();
    setIsLoadingMore(false);
  };

  return (
    <>
      <HomeBanner banners={banners} />
      <div className="container">
        <div className="heading">Shop Categories</div>
        <HomeCategories categories={categories} />
        <div className="heading">Product Overview</div>
        {isLoading ? (
          <ProductsSkeleton number={20} />
        ) : (
          <>
            <ProductList products={products} />
            {isLoadingMore && (
              <div className="loading-wrapper">
                <Spinner
                  color={'var(--color-primary)'}
                  width={60}
                  height={60}
                />
              </div>
            )}
            {hasLoadMore && !isLoadingMore && (
              <div className="load-more">
                <button className="btn" onClick={handleLoadMore}>
                  Load More
                </button>
              </div>
            )}

            {!hasLoadMore && (
              <div className="reached-end">
                No more products. You have reached the end.
              </div>
            )}
          </>
        )}
      </div>
      <style jsx>
        {`
          .container {
            max-width: 1200px;
            margin: 2rem auto;
          }

          .heading {
            padding: 1.5rem;
            font-weight: 700;
            font-size: 3rem;
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

          .reached-end {
            text-align: center;
            color: var(--color-primary);
            padding: 2rem 0;
            font-size: 1.5rem;
          }
        `}
      </style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { banners } = await BannerService.getBanners();
  const { categories } = await CategoryService.getCategories();

  return {
    props: { banners, categories },
  };
};

export default Home;
