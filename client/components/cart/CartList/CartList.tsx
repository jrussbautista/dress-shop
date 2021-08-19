import React from 'react';

import { CartItem as CartItemType } from '@/types';

import CartItem from '../CartItem';

import styles from './CartList.module.css';

interface Props {
  cartItems: CartItemType[];
}

const CartList = ({ cartItems }: Props) => {
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
