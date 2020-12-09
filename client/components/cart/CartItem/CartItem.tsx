import React, { useState } from 'react';
import { formatPrice } from 'utils/helpers';
import Link from 'next/link';
import { Cart } from 'types';
import { useToast, useCart } from 'contexts';
import { ProductInputQuantity } from 'components/product';
import styles from './CartItem.module.css';

interface Props {
  cart: Cart;
}

const CartItem: React.FC<Props> = ({ cart }) => {
  const { removeCart, updateCartQty } = useCart();
  const { setToast } = useToast();

  const [qty, setQty] = useState<string | number>(cart.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const total = formatPrice(parseFloat((cart.product.price * cart.quantity).toFixed(2)));

  const handleRemoveCart = async () => {
    try {
      await removeCart(cart._id);
    } catch (error) {
      setToast('error', error.message);
    }
  };

  const updateQtyAsync = async (quantity: number) => {
    try {
      setIsUpdating(true);
      await updateCartQty(cart._id, quantity);
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
      updateQtyAsync(cart.quantity);
      return;
    }

    updateQtyAsync(Number(qty));
  };

  return (
    <div className={styles.productList}>
      <div className={styles.product}>
        <div className={styles.productImg}>
          <Link href={`/product?id=${cart.product._id}`}>
            <a>
              <img src={cart.product.imageURL} alt={cart.product.name} />
            </a>
          </Link>
        </div>

        <div className={styles.productInfo}>
          <div className={styles.productName}>
            <Link href={`/product?id=${cart.product._id}`}>
              <a>{cart.product.name}</a>
            </Link>
          </div>

          <div className={`${styles.productPrice} ${styles.productContent}`}>
            {formatPrice(cart.product.price)}
          </div>
          <div className={`${styles.productQty} ${styles.productContent}`}>
            <div className="qty-container">
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
