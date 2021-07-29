import React, { useState, useEffect } from 'react';

import { Meta, MobileBottomMenu } from '@/components/core';
import { BannersSection, CategoriesSection } from '@/components/home';
import { ProductListSkeleton, ProductList } from '@/components/product';
import { Spinner, Button, Heading, Container } from '@/components/ui';
import { useShop } from '@/contexts';
import { useScrollRestoration } from '@/hooks';
import styles from '@/styles/Home.module.css';
import { Banner, Category } from '@/types';
import { colors } from '@/utils/theme';

interface Props {
  banners: Banner[];
  categories: Category[];
}

const Home: React.FC<Props> = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { isLoading, loadProducts, hasLoadMore, products } = useShop();

  useEffect(() => {
    if (isLoading) {
      loadProducts();
    }
  }, [isLoading, loadProducts]);

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
      <Meta />
      <BannersSection />
      <Container className={styles.container}>
        <CategoriesSection />
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

export default Home;
