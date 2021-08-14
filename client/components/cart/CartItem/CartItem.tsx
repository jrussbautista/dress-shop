import Link from 'next/link';
import React, { useState } from 'react';

import { CartItem as CartItemType } from 'types';

import styles from './CartItem.module.css';

import { ProductInputQuantity } from '@/components/product';
import { useToast, useCart } from '@/contexts';
import formatPrice from '@/utils/formatPrice';

interface Props {
  cartItem: CartItemType;
}

const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { removeCartItem, updateCartItemQty } = useCart();
  const { setToast } = useToast();

  const [qty, setQty] = useState<string | number>(cartItem.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const total = formatPrice(parseFloat((cartItem.product.price * cartItem.quantity).toFixed(2)));

  const handleRemoveCart = async () => {
    try {
      await removeCartItem(cartItem);
    } catch (error) {
      setToast('error', error.message);
    }
  };

  const updateQtyAsync = async (quantity: number) => {
    try {
      setIsUpdating(true);
      await updateCartItemQty(cartItem, quantity);
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
    <div className={styles.productList}>
      <div className={styles.product}>
        <div className={styles.productImg}>
          <Link href={`/products/${cartItem.product._id}`}>
            <a>
              <img src={cartItem.product.imageURL} alt={cartItem.product.name} />
            </a>
          </Link>
        </div>

        <div className={styles.productInfo}>
          <div className={styles.productName}>
            <Link href={`/products/${cartItem.product._id}`}>
              <a>{cartItem.product.name}</a>
            </Link>
          </div>

          <div className={`${styles.productPrice} ${styles.productContent}`}>
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
          <div className={`${styles.total} ${styles.productContent}`}>{total}</div>
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
