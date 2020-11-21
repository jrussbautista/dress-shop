import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import styles from './CheckoutStripeCard.module.css';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Poppins", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '17px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

interface Props {
  onChange(event: StripeCardElementChangeEvent): Promise<void>;
}

const CardSection: React.FC<Props> = ({ onChange }) => {
  return (
    <>
      <div>
        <span className={styles.label}> Card Details </span>
        <CardElement onChange={onChange} options={CARD_ELEMENT_OPTIONS} />
      </div>
    </>
  );
};

export default CardSection;
