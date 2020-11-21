import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardSection from '../CheckoutStripeCard/CheckoutStripeCard';
import { CheckOutService } from 'services';
import { useAuth, useToast, useCart } from 'contexts';
import { PageLoader, Alert, Button } from 'components/shared';
import { StripeCardElement, StripeCardElementChangeEvent } from '@stripe/stripe-js';
import styles from './CheckoutStripeForm.module.css';

const CheckoutStripeForm: React.FC = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const { clearCart } = useCart();
  const { currentUser } = useAuth();
  const { setToast } = useToast();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    CheckOutService.createPaymentIntent()
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch(() => {
        setError('Error in creating payment intent');
      });
  }, []);

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

    const result = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: currentUser?.email,
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
        billing_details: {
          name: currentUser?.name,
          email: currentUser?.email,
        },
      },
    });

    if (result.error?.message) {
      setToast('error', result.error.message);
      setProcessing(false);
    } else {
      // The payment has been processed!
      if (result.paymentIntent?.status === 'succeeded') {
        clearCart();
        setToast('success', 'Order Success. Thank you for your order');
        setError(null);
        setSucceeded(true);
        Router.push('/order');
      }
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
