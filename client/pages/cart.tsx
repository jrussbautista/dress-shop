import React from 'react';
import { CartList, CartSubTotal, CarSkeleton } from 'components/domain/Cart';
import { useAuth, useCart } from 'store';
import { ErrorPage, Button, Meta, MobileBottomMenu } from 'components/shared';
import calculateCartTotal from 'utils/calculateCartTotal';

const Cart: React.FC = () => {
  const { currentUser } = useAuth();
  const { carts, loading, error } = useCart();

  const { cartTotal } = calculateCartTotal(carts);

  if (loading) {
    return <CarSkeleton />;
  }

  if (error) {
    return <ErrorPage message="Cannot fetch cart at this moment. Please try again" />;
  }

  return (
    <>
      <Meta title="Cart" />
      <div className="container">
        {currentUser ? (
          <div>
            <h1 className="page-title">Your Cart</h1>
            {carts.length > 0 ? (
              <>
                <CartList />
                <CartSubTotal total={Number(cartTotal)} />
                <div className="checkout-btn-wrapper">
                  <Button href="/checkout" title="Check Out" style={{ width: '15rem' }} />
                </div>
              </>
            ) : (
              <div className="msg-container">
                <div className="msg"> Your cart is empty :( </div>
                <Button href="/" title="Go Shop Now" style={{ width: '20rem' }} />
              </div>
            )}
          </div>
        ) : (
          <div className="msg-container">
            <h1 className="page-title"> Please login to see your cart </h1>
            <Button href="/auth?type=login" title="Log In" style={{ width: '15rem' }} />
          </div>
        )}
      </div>
      <MobileBottomMenu />
      <style jsx>
        {`
          .container {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 2rem;
          }

          .page-title {
            font-size: 3rem;
          }

          .checkout-btn-wrapper {
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }

          .msg {
            font-size: 2.2rem;
            margin: 2rem 0;
          }

          .msg-container {
            padding: 2rem 0;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
};

export default Cart;
