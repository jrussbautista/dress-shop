import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { Cart } from '../types';
import {
  CheckOutList,
  CheckOutPaypal,
  CheckoutStripeForm,
} from '../features/CheckOut';
import { CartService } from '../services';
import { getCurrency } from '../utils/helpers';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CLIENT_KEY } from '../utils/constants';
import calculateCartTotal from '../utils/calculateCartTotal';

interface Props {
  carts: Cart[];
  error: null | string;
}

const stripePromise = loadStripe(STRIPE_CLIENT_KEY);

const Checkout: React.FC<Props> = ({ carts, error }) => {
  const { cartTotal } = calculateCartTotal(carts);

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="left">
            <h2> Checkout Items </h2>
            <CheckOutList items={carts} />
            <div className="payment-total">
              <div className="payment-wrapper">
                <div className="list">
                  <div className="label"> Sub Total </div>
                  <div className="item"> {getCurrency(cartTotal)} </div>
                </div>
                <div className="list">
                  <div className="label"> Total </div>
                  <div className="item total">{getCurrency(cartTotal)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <h2> Payment Method </h2>
            <Elements stripe={stripePromise}>
              <CheckoutStripeForm />
            </Elements>
            <div className="with-or">
              <span className="line"></span> <span className="middle">or</span>
              <span className="line"></span>
            </div>
            <CheckOutPaypal />
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 2rem;
        }

        .payment-total {
          margin: 2rem 0;
        }

        .label {
          font-size: 1.6rem;
          padding: 0 6rem;
        }

        .item {
          font-size: 1.6rem;
        }

        .list {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 1rem;
        }

        .total {
          color: var(--color-primary);
          font-weight: 600;
          font-size: 2rem;
        }

        .with-or {
          padding: 2rem 0;
          text-align: center;
          display: flex;
          align-items: center;
        }

        .middle {
          padding: 0 0.6rem;
        }

        .line {
          flex: 1;
          height: 1px;
          background-color: #ccc;
        }

        @media only screen and (min-width: 1024px) {
          .wrapper {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row-reverse;
          }

          .left {
            width: 55%;
            padding-left: 4rem;
          }

          .right {
            flex: 1;
          }
        }
      `}</style>
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

  let carts: Cart[] = [];
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

export default Checkout;
