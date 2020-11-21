import React from 'react';
import { Cart } from '../types';
import { CheckoutList, CheckoutPaypal, CheckoutStripeForm } from 'components/checkout';
import { formatPrice } from 'utils/helpers';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CLIENT_KEY } from 'utils/constants';
import calculateCartTotal from 'utils/calculateCartTotal';
import { Meta, ErrorMessage, Container } from 'components/shared';
import { useCart } from 'contexts';
import styles from 'styles/Checkout.module.css';

interface Props {
  carts: Cart[];
  error: null | string;
}

const stripePromise = loadStripe(STRIPE_CLIENT_KEY);

const Checkout: React.FC<Props> = () => {
  const { carts, error } = useCart();
  const { cartTotal } = calculateCartTotal(carts);

  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <Meta title="Check Out" />
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <h2> Checkout Items </h2>
            <CheckoutList items={carts} />
            <div className={styles.paymentTotal}>
              <div className={styles.paymentWrapper}>
                <div className={styles.list}>
                  <div className={styles.label}> Sub Total </div>
                  <div className={styles.item}> {formatPrice(cartTotal)} </div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}> Total </div>
                  <div className={`${styles.item} ${styles.total}`}>{formatPrice(cartTotal)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <h2> Payment Method </h2>
            <Elements stripe={stripePromise}>
              <CheckoutStripeForm />
            </Elements>
            <div className={styles.withOr}>
              <span className={styles.line}></span> <span className={styles.middle}>or</span>
              <span className={styles.line}></span>
            </div>
            <CheckoutPaypal />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
