import React, { useState, useEffect } from 'react';

import { ProductList } from '@/components/product';
import { Spinner, Button, Heading } from '@/components/ui';
import { useShop } from '@/contexts';
import { Product } from '@/types';
import { colors } from '@/utils/theme';

import styles from './ProductOverviewSection.module.css';

interface Props {
  initialProducts: Product[];
}

const ProductOverview = ({ initialProducts }: Props) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { loadMoreProducts, hasLoadMore, products, setInitialProducts } = useShop();

  useEffect(() => {
    if (products.length === 0) {
      setInitialProducts(initialProducts);
    }
  }, [initialProducts, products.length, setInitialProducts]);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await loadMoreProducts();
    setIsLoadingMore(false);
  };

  const showLoadMore = () => {
    return hasLoadMore && !isLoadingMore;
  };

  return (
    <div className={styles.container}>
      <Heading>Product Overview</Heading>

      <ProductList products={products} />

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
