import React from 'react';

import WishlistItem from './WishlistItem';
import styles from './WishlistItems.module.css';

import { Button, Spinner } from '@/components/ui';
import { useWishlist } from '@/contexts';

const WishlistItems: React.FC = () => {
  const { wishlistItems, loading } = useWishlist();

  if (loading) {
    return <Spinner size={40} />;
  }

  return (
    <>
      {wishlistItems.length > 0 ? (
        wishlistItems.map((wishlistItem) => (
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
