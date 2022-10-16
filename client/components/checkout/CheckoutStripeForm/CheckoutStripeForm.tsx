import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import Router from 'next/router';
import React, { useState } from 'react';

import { PageLoader, Alert, Button } from '@/components/ui';
import { useToast } from '@/contexts';
import useAddOrder from '@/hooks/orders/useAddOrder';
import useUser from '@/hooks/user/useUser';

import CardSection from '../CheckoutStripeCard/CheckoutStripeCard';

import styles from './CheckoutStripeForm.module.css';

const CheckoutStripeForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { data: currentUser } = useUser();
  const { addOrder } = useAddOrder();
  const { setToast } = useToast();
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: currentUser?.name,
        email: currentUser?.email,
      },
    });

    if (error) {
      setToast('error', error.message as string);
      setProcessing(false);
      return;
    }

    try {
      await addOrder(paymentMethod?.id as string);
      setSucceeded(true);
      setProcessing(false);
      setError(null);
      Router.push('/orders');
    } catch (error) {
      setToast('error', error.message);
      setProcessing(false);
    }
  };

  return (
    <>
      {processing && <PageLoader />}
      <form onSubmit={handleSubmit}>
        {error && (
          <div className={styles.alertContainer}>
            <Alert message={error} type="error" />
          </div>
        )}
        <CardSection onChange={handleChange} />
        <Button
          disabled={processing || disabled || succeeded}
          type="submit"
          title="Confirm Order"
          className={styles.button}
        />
      </form>
    </>
  );
};

export default CheckoutStripeForm;
