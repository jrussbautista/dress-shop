import React, { useState, useEffect } from 'react';
import { Spinner, Button, Banners, Heading, Container } from 'components/ui';
import { MobileBottomMenu } from 'components/core';
import { ProductListSkeleton, ProductList } from 'components/product';
import { Categories } from 'components/category';
import { useShop } from 'contexts';
import { GetServerSideProps } from 'next';
import { BannerService, CategoryService } from 'services';
import { Banner, Category } from 'types';
import { useScrollRestoration } from 'hooks';
import { colors } from 'utils/theme';
import styles from 'styles/Home.module.css';

interface Props {
  banners: Banner[];
  categories: Category[];
}

const Home: React.FC<Props> = ({ banners, categories }) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { isLoading, loadProducts, hasLoadMore, products } = useShop();

  useEffect(() => {
    // load products if empty
    products.length === 0 && loadProducts();
  }, []);

  useScrollRestoration();

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await loadProducts();
    setIsLoadingMore(false);
  };

  const showLoadMore = () => {
    return !isLoading && hasLoadMore && !isLoadingMore;
  };

  return (
    <>
      <Banners banners={banners} />
      <Container className={styles.container}>
        <Heading>Shop Categories</Heading>
        <Categories categories={categories} />
        <Heading>Product Overview</Heading>
        {isLoading ? <ProductListSkeleton number={20} /> : <ProductList products={products} />}
        {isLoadingMore && (
          <div className={styles.loadingWrapper}>
            <Spinner color={colors.primary} size={30} />
          </div>
        )}

        {showLoadMore() && (
          <div className={styles.loadMore}>
            <Button
              title="Load More"
              className={styles.loadMoreBtn}
              onClick={handleLoadMore}
              type="button"
              variant="outline"
            />
          </div>
        )}

        {!hasLoadMore && (
          <div className={styles.reachedEnd}>No more products. You have reached the end.</div>
        )}
      </Container>
      <MobileBottomMenu />
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
