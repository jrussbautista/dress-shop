import React from 'react';

import { CartSkeleton } from '@/components/cart';
import { ErrorMessage, Button } from '@/components/ui';
import useCart from '@/hooks/cart/use-cart';

import CartItem from '../CartItem';

import styles from './CartList.module.css';

const CartList = () => {
  const { data, isLoading, error } = useCart();

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (error) {
    return <ErrorMessage message="Cannot fetch cart at this moment. Please try again" />;
  }

  return (
    <div>
      {data?.items.length ? (
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

          {data?.items.length && (
            <div role="listbox">
              {data?.items.map((cartItem) => (
                <CartItem cartItem={cartItem} key={cartItem._id} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className={styles.msgContainer}>
          <div className={styles.msg}> Your cart is empty :( </div>
          <Button href="/" title="Go Shop Now" />
        </div>
      )}
    </div>
  );
};

export default CartList;
