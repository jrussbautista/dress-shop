import React from 'react';
import { CartList, CartSubTotal, CartSkeleton } from 'components/cart';
import { useAuth, useCart } from 'contexts';
import { ErrorMessage, Button, Heading, Container } from 'components/ui';
import { Meta, MobileBottomMenu } from 'components/core';
import calculateCartTotal from 'utils/calculateCartTotal';
import styles from 'styles/Cart.module.css';

const Cart: React.FC = () => {
  const { currentUser } = useAuth();
  const { carts, loading, error } = useCart();

  const { cartTotal } = calculateCartTotal(carts);

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
        {currentUser ? (
          <div className={styles.cartContainer}>
            <Heading>Your Cart </Heading>
            {carts.length > 0 ? (
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
        ) : (
          <div className={styles.msgContainer}>
            <h1 className={styles.msg}> Please login to see your cart </h1>
            <Button href="/auth?type=login" title="Log In" />
          </div>
        )}
      </Container>
      <MobileBottomMenu />
    </>
  );
};

export default Cart;
