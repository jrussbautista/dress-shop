import Link from 'next/link';
import { useState } from 'react';
import { CartList, CartSubTotal } from '../features/Cart';
import { useAuth, useCart } from '../store';
import calculateCartTotal from '../utils/calculateCartTotal';
import { GetServerSideProps } from 'next';
import { CartService } from '../services';
import { parseCookies } from 'nookies';
import { Carts, Cart as CartType } from '../types';
import { ErrorPage } from '../shared';

interface Props extends Carts {
  error: string | null;
}

const Cart: React.FC<Props> = ({ carts, error }) => {
  const [myCarts, setMyCarts] = useState(carts);
  const { currentUser } = useAuth();
  const { removeCart } = useCart();
  const { cartTotal } = calculateCartTotal(myCarts);

  const handleRemoveCart = async (cartId: string, productId: string) => {
    try {
      const { token } = parseCookies({});
      await CartService.removeCart(token, cartId);
      const filterCarts = myCarts.filter((cart) => cart._id !== cartId);
      setMyCarts(filterCarts);
      removeCart(productId);
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return (
      <ErrorPage message="Error in getting carts. Please try again later." />
    );
  }

  return (
    <>
      <div className="container">
        {currentUser ? (
          <div>
            <h1 className="page-title">Your Cart</h1>
            {myCarts.length > 0 ? (
              <>
                <CartList carts={myCarts} removeCart={handleRemoveCart} />
                <CartSubTotal total={Number(cartTotal)} />
                <div className="checkout-btn-wrapper">
                  <Link href="/checkout">
                    <a className="checkout-btn">CHECK OUT</a>
                  </Link>
                </div>
              </>
            ) : (
              <div className="msg-container">
                <div className="msg"> Your cart is empty :( </div>
                <Link href="/">
                  <a className="btn"> Go Shop Now </a>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="msg-container">
            <h1 className="page-title"> Please login to see your cart </h1>
            <Link href="/login">
              <a className="btn"> Login </a>
            </Link>
          </div>
        )}
      </div>
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

          .checkout-btn,
          .btn {
            width: 20rem;
            color: #fff;
            background-color: var(--color-dark);
            border: 1px solid var(--color-dark);
            height: 6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            cursor: pointer;
          }

          .btn {
            margin: 5rem 0;
          }

          .msg {
            font-size: 2.2rem;
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
  let error: null | string = null;
  try {
    const result = await CartService.fetchCarts(token);
    carts = result.carts;
  } catch (error) {
    return {
      props: {
        error: 'something went wrong',
        carts: [],
      },
    };
  }

  return {
    props: { carts, error },
  };
};

export default Cart;
