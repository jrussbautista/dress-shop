import { useRouter } from 'next/router';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { useToast } from '@/contexts';
import useUser from '@/hooks/user/useUser';
import useAddItem from '@/hooks/wishlist/useAddItem';
import useRemoveItem from '@/hooks/wishlist/useRemoveItem';
import useWishlist from '@/hooks/wishlist/useWishlist';
import { colors } from '@/utils/theme';

import styles from './WishlistButton.module.css';

interface Props {
  productId: string;
}

const WishlistButton = ({ productId }: Props) => {
  const router = useRouter();
  const { data: currentUser } = useUser();

  const { data } = useWishlist();
  const { addToWishlist, addingToWishlist } = useAddItem();
  const { removeToWishlist, removingToWishlist } = useRemoveItem();

  const { setToast } = useToast();

  const isProductInWishlist = data?.some((wishlistItem) => wishlistItem.product._id === productId);

  const handleWishlistChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (!currentUser) {
        setToast('error', 'Please, login first.');
        return router.push('/login');
      }

      if (isProductInWishlist) {
        await removeToWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    } catch (error) {
      setToast(
        'error',
        "Sorry! We we'rent able to removed wishlist item  right now. Please try again later."
      );
    }
  };

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleWishlistChange}
      disabled={addingToWishlist || removingToWishlist}
    >
      {isProductInWishlist ? (
        <AiFillHeart size={30} color={colors.red} />
      ) : (
        <AiOutlineHeart size={30} color={colors.red} />
      )}
    </button>
  );
};

export default WishlistButton;
