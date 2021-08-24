import React from 'react';

import { Button, Spinner } from '@/components/ui';
import useWishlist from '@/hooks/wishlist/use-wishlist';

import WishlistItem from './WishlistItem';
import styles from './WishlistItems.module.css';

const WishlistItems = () => {
  const { data, isLoading } = useWishlist();

  if (isLoading) {
    return <Spinner size={40} />;
  }

  return (
    <>
      {data && data.length ? (
        data.map((wishlistItem) => (
          <WishlistItem wishlistItem={wishlistItem} key={wishlistItem._id} />
        ))
      ) : (
        <div className={styles.emptyContainer}>
          <p>Wishlist is empty :(</p>
          <Button title="Go shop now" href="/" />
        </div>
      )}
    </>
  );
};

export default WishlistItems;
