import { useRouter } from 'next/router';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { useWishlist, useToast, useAuth } from '@/contexts';
import { colors } from '@/utils/theme';

import styles from './WishlistButton.module.css';

interface Props {
  productId: string;
}

const WishlistButton = ({ productId }: Props) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { wishlistItems, addWishlistItem, removeWishlistItem } = useWishlist();

  const { setToast } = useToast();

  const isProductInWishlist = wishlistItems.some(
    (wishlistItem) => wishlistItem.product._id === productId
  );

  const handleWishlistChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (!isAuthenticated) {
        setToast('error', 'Please, login first.');
        return router.push('/login');
      }

      if (isProductInWishlist) {
        await removeWishlistItem(productId);
      } else {
        await addWishlistItem(productId);
      }
    } catch (error) {
      setToast(
        'error',
        "Sorry! We we'rent able to removed wishlist item  right now. Please try again later."
      );
    }
  };

  return (
    <button type="button" className={styles.button} onClick={handleWishlistChange}>
      {isProductInWishlist ? (
        <AiFillHeart size={30} color={colors.red} />
      ) : (
        <AiOutlineHeart size={30} color={colors.red} />
      )}
    </button>
  );
};

export default WishlistButton;
