import React from 'react';

import CartItem from '../CartItem';

import styles from './CartList.module.css';

import { useCart } from '@/contexts';

const CartList: React.FC = () => {
  const { cartItems } = useCart();

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
        {cartItems.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem._id} />
        ))}
      </>
    </div>
  );
};

export default CartList;
