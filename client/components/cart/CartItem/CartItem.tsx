import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { ProductInputQuantity } from '@/components/product';
import { useToast } from '@/contexts';
import useRemoveItem from '@/hooks/cart/use-remove-item';
import useUpdateItem from '@/hooks/cart/use-update-item';
import { CartItem as CartItemType } from '@/types';
import formatPrice from '@/utils/formatPrice';

import styles from './CartItem.module.css';

interface Props {
  cartItem: CartItemType;
}

const CartItem = ({ cartItem }: Props) => {
  const { removeFromCart } = useRemoveItem();
  const { updateFromCart } = useUpdateItem();
  const { setToast } = useToast();

  const [qty, setQty] = useState<string | number>(cartItem.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const total = formatPrice(parseFloat((cartItem.product.price * cartItem.quantity).toFixed(2)));

  const handleRemoveCart = async () => {
    try {
      await removeFromCart(cartItem.product._id);
    } catch (error) {
      setToast('error', error.message);
    }
  };

  const updateQtyAsync = async (quantity: number) => {
    try {
      setIsUpdating(true);
      await updateFromCart(cartItem.product._id, quantity);
      setQty(quantity);
    } catch (error) {
      setToast('error', error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChangeQty = (value: string | number) => {
    if (Number(value) > 10) {
      setToast('error', 'Ops up to 10 max only');
      setQty(10);
      return;
    }
    setQty(value);
  };

  const handleBtnChangeQty = (action: string) => {
    if (qty >= 10) {
      setToast('error', 'Ops you can add to cart up to 10 max only');
      return;
    }

    if (action === 'add') {
      const quantity = Number(qty) + 1;
      updateQtyAsync(quantity);
      return;
    }

    if (qty > 1) {
      const quantity = Number(qty) - 1;
      updateQtyAsync(quantity);
    }
  };

  const handleChangeBlur = (val: string) => {
    if (!val) {
      updateQtyAsync(cartItem.quantity);
      return;
    }

    updateQtyAsync(Number(qty));
  };

  return (
    <div className={styles.productList} role="listitem">
      <div className={styles.product}>
        <div className={styles.productImg}>
          <Link href={`/products/${cartItem.product._id}`}>
            <a>
              <Image
                src={cartItem.product.imageURL}
                alt={cartItem.product.name}
                width={150}
                height={150}
              />
            </a>
          </Link>
        </div>

        <div className={styles.productInfo}>
          <div className={styles.productName}>
            <Link href={`/products/${cartItem.product._id}`}>
              <a>{cartItem.product.name}</a>
            </Link>
          </div>

          <div
            className={`${styles.productPrice} ${styles.productContent}`}
            aria-label="Product price"
          >
            {formatPrice(cartItem.product.price)}
          </div>
          <div className={`${styles.productQty} ${styles.productContent}`}>
            <div className={styles.qtyContainer}>
              <ProductInputQuantity
                isUpdating={isUpdating}
                value={qty}
                onButtonClick={handleBtnChangeQty}
                onChangeInput={handleInputChangeQty}
                onChangeBlur={handleChangeBlur}
              />
            </div>
          </div>
          <p
            aria-label="Product price total"
            className={`${styles.total} ${styles.productContent}`}
          >
            {total}
          </p>
          <div className={styles.productAction}>
            <button className={styles.btnCartAction} onClick={handleRemoveCart}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
