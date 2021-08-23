import React from 'react';

import { ProductList } from '@/components/product';
import { Spinner, Button, Heading } from '@/components/ui';
import useProducts from '@/hooks/products/use-products';
import { Product } from '@/types';
import { colors } from '@/utils/theme';

import styles from './ProductOverviewSection.module.css';

interface Props {
  initialProducts: Product[];
}

const ProductOverview = ({ initialProducts }: Props) => {
  const { products, loadMore, isLoadingMore, isReachingEnd } = useProducts(initialProducts);

  const showLoadMore = !isLoadingMore && !isReachingEnd;

  return (
    <div className={styles.container}>
      <Heading>Product Overview</Heading>

      <ProductList products={products} />

      {isLoadingMore && (
        <div className={styles.loadingWrapper}>
          <Spinner color={colors.primary} size={30} />
        </div>
      )}

      {showLoadMore && (
        <div className={styles.loadMore}>
          <Button
            title="Load More"
            className={styles.loadMoreBtn}
            onClick={() => loadMore()}
            type="button"
            variant="outline"
          />
        </div>
      )}

      {isReachingEnd && (
        <div className={styles.reachedEnd}>No more products. You have reached the end.</div>
      )}
    </div>
  );
};

export default ProductOverview;
