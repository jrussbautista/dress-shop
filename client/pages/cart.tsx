import React from 'react';

import { CartList, CartSubTotal } from '@/components/cart';
import { Meta, MobileBottomMenu } from '@/components/core';
import WithAuth from '@/components/core/WithAuth';
import { Button, Heading, Container } from '@/components/ui';
import useCart from '@/hooks/cart/use-cart';
import styles from '@/styles/Cart.module.css';
import calculateCartTotal from '@/utils/calculateCartTotal';

const Cart = () => {
  const { data } = useCart();

  const cartItems = data ? data.items : [];
  const { cartTotal } = calculateCartTotal(cartItems);

  return (
    <>
      <Meta title="Cart" />
      <Container>
        <div className={styles.cartContainer}>
          <Heading>Your Cart </Heading>
          <CartList />
          {cartItems.length ? (
            <>
              <CartSubTotal total={Number(cartTotal)} />
              <div className={styles.checkoutBtnWrapper}>
                <Button href="/checkout" title="Check Out" />
              </div>
            </>
          ) : null}
        </div>
      </Container>
      <MobileBottomMenu />
    </>
  );
};

export default WithAuth(Cart);
