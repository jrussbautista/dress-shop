import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';

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
  onChange(event: any): Promise<void>;
}

const CardSection: React.FC<Props> = ({ onChange }) => {
  return (
    <>
      <label>
        <span className="label"> Card Details </span>
        <CardElement onChange={onChange} options={CARD_ELEMENT_OPTIONS} />
      </label>
      <style jsx>{`
        .label {
          font-size: 1.7rem;
          margin-bottom: 1.5rem;
          display: block;
        }
      `}</style>
    </>
  );
};

export default CardSection;
