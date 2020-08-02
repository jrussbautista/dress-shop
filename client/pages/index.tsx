import React, { useState } from 'react';
import { HomeBanner, HomeCategories, HomeProducts } from 'components/domain/Home';
import { Spinner, Button } from 'components/shared';
import { useShop } from 'store';
import { GetServerSideProps } from 'next';
import { BannerService, CategoryService } from 'services';
import { Banner, Category } from 'types';
import { useScrollRestoration } from 'hooks';
import { MobileBottomMenu } from 'components/shared';

interface Props {
  banners: Banner[];
  categories: Category[];
}

const Home: React.FC<Props> = ({ banners, categories }) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { isLoading, loadProducts, hasLoadMore } = useShop();

  useScrollRestoration();

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

        <HomeProducts />

        {isLoadingMore && (
          <div className="loading-wrapper">
            <Spinner color={'var(--color-primary)'} width={60} height={60} />
          </div>
        )}

        {!isLoading && hasLoadMore && !isLoadingMore && (
          <div className="load-more">
            <Button
              title="Load More"
              onClick={handleLoadMore}
              type="button"
              variant="outline"
              style={{
                borderRadius: '50px',
                fontSize: '1.6rem',
                width: '20rem',
              }}
            />
          </div>
        )}

        {!hasLoadMore && (
          <div className="reached-end">No more products. You have reached the end.</div>
        )}
      </div>
      <MobileBottomMenu />
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
