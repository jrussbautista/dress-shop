import React from 'react';
import { Product } from '@/types';
import formatPrice from '@/utils/formatPrice';
import { WishlistButton } from 'components/wishlist';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import Link from 'next/link';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link href={`/products/${product._id}`}>
      <a>
        <div>
          <div className={styles.productImgWrapper}>
            <Image src={product.imageURL} alt="Picture of the author" width={500} height={500} />
            <div className={styles.wishlistButtonContainer}>
              <WishlistButton productId={product._id} />
            </div>
          </div>
          <div className={styles.productInfo}>
            <div className={styles.productName}>{product.name}</div>
            <div className={styles.productPrice}>{formatPrice(product.price)}</div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
