import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { Button } from '@/components/ui';
import { useToast } from '@/contexts';
import useRemoveItem from '@/hooks/wishlist/use-remove-item';
import { WishlistItem as WishlistItemType } from '@/types/Wishlist';
import formatPrice from '@/utils/formatPrice';

import styles from './WishlistItem.module.css';

interface Props {
  wishlistItem: WishlistItemType;
}

const WishlistItem = ({ wishlistItem }: Props) => {
  const { removeToWishlist } = useRemoveItem();
  const { setToast } = useToast();

  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    try {
      setRemoving(true);
      await removeToWishlist(wishlistItem.product._id);
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
    <div className={classNames(styles.wishlistItemContainer, removing ? styles.removing : '')}>
      <Link href={`/products/${wishlistItem.product._id}`}>
        <a>
          <div className={styles.mediaContainer}>
            <Image
              width={150}
              height={150}
              className={styles.mediaImage}
              src={wishlistItem.product.imageURL}
              alt={wishlistItem.product.name}
            />
          </div>
        </a>
      </Link>
      <div className={styles.infoContainer}>
        <Link href={`/products/${wishlistItem.product._id}`}>
          <a>
            <p className={styles.name}>{wishlistItem.product.name}</p>
          </a>
        </Link>
        <p className={styles.price}>{formatPrice(wishlistItem.product.price)}</p>
        <div className={styles.buttonsContainer}>
          <Button title="Remove" onClick={handleRemove} disabled={removing} loading={removing} />
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
