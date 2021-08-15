import React, { useState, useEffect } from 'react';

import { ProductListSkeleton, ProductList } from '@/components/product';
import { Spinner, Button, Heading } from '@/components/ui';
import { useShop } from '@/contexts';
import { colors } from '@/utils/theme';

import styles from './ProductOverviewSection.module.css';

const ProductOverview = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { isLoading, loadProducts, hasLoadMore, products } = useShop();

  useEffect(() => {
    if (isLoading) {
      loadProducts();
    }
  }, [isLoading, loadProducts]);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await loadProducts();
    setIsLoadingMore(false);
  };

  const showLoadMore = () => {
    return !isLoading && hasLoadMore && !isLoadingMore;
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default ProductOverview;
