import React, { useState } from 'react';
import Link from 'next/link';
import { WishlistItem as WishlistItemType } from 'types/Wishlist';
import formatPrice from 'utils/formatPrice';
import { Button } from 'components/ui';
import styles from './WishlistItem.module.css';
import { useWishlist, useToast } from 'contexts';
import classNames from 'classnames';

interface Props {
  wishlistItem: WishlistItemType;
}

const WishlistItem: React.FC<Props> = ({ wishlistItem }) => {
  const { removeWishlistItem } = useWishlist();

  const { setToast } = useToast();

  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    try {
      setRemoving(true);
      await removeWishlistItem(wishlistItem.product._id);
      setToast('success', "You've successfully removed wishlist item.");
    } catch (error) {
      setToast(
        'error',
        "Sorry! We we'rent able to removed wishlist item  right now. Please try again later."
      );
      setRemoving(false);
    }
  };

  return (
    <Link href={`/products/${wishlistItem.product._id}`}>
      <a className={classNames(styles.wishlistItemContainer, removing ? styles.removing : '')}>
        <div className={styles.mediaContainer}>
          <img
            className={styles.mediaImage}
            src={wishlistItem.product.imageURL}
            alt={wishlistItem.product.name}
          />
        </div>
        <div className={styles.infoContainer}>
          <p className={styles.name}>{wishlistItem.product.name}</p>
          <p className={styles.price}>{formatPrice(wishlistItem.product.price)}</p>
          <div className={styles.buttonsContainer}>
            <Button title="Remove" onClick={handleRemove} />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default WishlistItem;
