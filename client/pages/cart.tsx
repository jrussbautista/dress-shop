import React from 'react';

import { CartList, CartSubTotal, CartSkeleton } from '@/components/cart';
import { Meta, MobileBottomMenu } from '@/components/core';
import WithAuth from '@/components/core/WithAuth';
import { ErrorMessage, Button, Heading, Container } from '@/components/ui';
import useCart from '@/hooks/cart/use-cart';
import styles from '@/styles/Cart.module.css';
import calculateCartTotal from '@/utils/calculateCartTotal';

const Cart = () => {
  const { data, isLoading, error } = useCart();

  const cartItems = data ? data.items : [];
  const { cartTotal } = calculateCartTotal(cartItems);

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (error) {
    return <ErrorMessage message="Cannot fetch cart at this moment. Please try again" />;
  }

  return (
    <>
      <Meta title="Cart" />
      <Container>
        <div className={styles.cartContainer}>
          <Heading>Your Cart </Heading>

          {cartItems.length > 0 && (
            <>
              <CartList />
              <CartSubTotal total={Number(cartTotal)} />
              <div className={styles.checkoutBtnWrapper}>
                <Button href="/checkout" title="Check Out" />
              </div>
            </>
          )}

          {cartItems.length === 0 && (
            <div className={styles.msgContainer}>
              <div className={styles.msg}> Your cart is empty :( </div>
              <Button href="/" title="Go Shop Now" />
            </div>
          )}
        </div>
      </Container>
      <MobileBottomMenu />
    </>
  );
};

export default WithAuth(Cart);
