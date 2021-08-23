import React from 'react';

import useCart from '@/hooks/cart/use-cart';

import CartItem from '../CartItem';

import styles from './CartList.module.css';

const CartList = () => {
  const { data } = useCart();
  return (
    <div>
      <>
        <div className={styles.cartHeader}>
          <div className={styles.cartHeaderProduct}> Product </div>
          <div className={styles.cartHeaderLbl}> Price</div>
          <div className={styles.cartHeaderLbl}> Quantity</div>
          <div className={styles.cartHeaderLbl}> Total</div>
          <div className={styles.cartHeaderLbl} style={{ textAlign: 'right' }}>
            Action
          </div>
        </div>

        {data?.items && (
          <div role="listbox">
            {data?.items.map((cartItem) => (
              <CartItem cartItem={cartItem} key={cartItem._id} />
            ))}
          </div>
        )}
      </>
    </div>
  );
};

export default CartList;
