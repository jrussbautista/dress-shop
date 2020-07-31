import React, { useState } from 'react';
import { CartList, CartSubTotal } from '../features/Cart';
import { useAuth, useCart } from '../store';
import { GetServerSideProps } from 'next';
import { CartService } from '../services';
import { parseCookies } from 'nookies';
import { Carts, Cart as CartType } from '../types';
import { ErrorPage, Button, Meta, MobileBottomMenu } from '../shared';
import calculateCartTotal from '../utils/calculateCartTotal';

interface Props extends Carts {
  error: string | null;
}

const Cart: React.FC<Props> = ({ carts, error }) => {
  const { currentUser } = useAuth();
  const { removeCart } = useCart();

  const [myCarts, setMyCarts] = useState(carts);
  const { cartTotal } = calculateCartTotal(myCarts);

  const handleRemoveCart = async (cartId: string, productId: string) => {
    const filterCarts = myCarts.filter((cart) => cart._id !== cartId);
    setMyCarts(filterCarts);
    removeCart(productId);
  };

  const handleUpdateCartQty = async (cartId: string, quantity: number) => {
    const newCarts = myCarts.map((cart) => (cart._id === cartId ? { ...cart, quantity } : cart));
    setMyCarts(newCarts);
  };

  if (error) {
    return <ErrorPage message="Error in getting carts. Please try again later." />;
  }

  return (
    <>
      <Meta title="Cart" />
      <div className="container">
        {currentUser ? (
          <div>
            <h1 className="page-title">Your Cart</h1>
            {myCarts.length > 0 ? (
              <>
                <CartList
                  carts={myCarts}
                  removeCart={handleRemoveCart}
                  updateQty={handleUpdateCartQty}
                />
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
            <Button href="/login" title="Log In" style={{ width: '15rem' }} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = parseCookies(context);

  if (!token) {
    return {
      props: {
        error: false,
        carts: [],
      },
    };
  }

  let carts: CartType[] = [];
  const error: null | string = null;

  try {
    const { carts: myCarts } = await CartService.fetchCarts(token);
    carts = myCarts;
  } catch (error) {
    return {
      props: {
        error: 'Something went wrong',
        carts: [],
      },
    };
  }

  return {
    props: { carts, error },
  };
};

export default Cart;
