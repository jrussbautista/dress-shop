import React from 'react';
import { CartList, CartSubTotal, CartSkeleton } from 'components/cart';
import { useCart } from 'contexts';
import { ErrorMessage, Button, Heading, Container } from 'components/ui';
import { Meta, MobileBottomMenu } from 'components/core';
import calculateCartTotal from 'utils/calculateCartTotal';
import styles from 'styles/Cart.module.css';
import WithAuth from 'components/core/WithAuth';

const Cart: React.FC = () => {
  const { cartItems, loading, error } = useCart();

  const { cartTotal } = calculateCartTotal(cartItems);

  if (loading) {
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
          {cartItems.length > 0 ? (
            <>
              <CartList />
              <CartSubTotal total={Number(cartTotal)} />
              <div className={styles.checkoutBtnWrapper}>
                <Button href="/checkout" title="Check Out" />
              </div>
            </>
          ) : (
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
