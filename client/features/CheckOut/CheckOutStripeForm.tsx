import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './CheckOutStripeCard';
import { CheckOutService } from '../../services';
import { useAuth, useToast, useCart } from '../../store';
import { parseCookies } from 'nookies';
import { PageLoader, Alert } from '../../shared';
import Router from 'next/router';
import { StripeCardElement } from '@stripe/stripe-js';

export const CheckoutStripeForm = () => {
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
    const { token } = parseCookies({});
    CheckOutService.createPaymentIntent(token)
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        setError('Error in creating payment intent');
      });
  }, []);

  const handleChange = async (event: any) => {
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
          <div className="alert-container">
            <Alert message={error} type="error" />
          </div>
        )}

        <CardSection onChange={handleChange} />
        <button disabled={processing || disabled || succeeded} className="btn">
          {processing ? '...' : 'Confirm order'}
        </button>
      </form>
      <style jsx>{`
        .alert-container {
          margin-bottom: 1rem;
        }

        .btn {
          margin-top: 2em;
          background-color: var(--color-dark);
          color: #fff;
          width: 100%;
          height: 50px;
          font-size: 17px;
          border: 1px solid var(--color-dark);
          display: block;
        }

        .btn:disabled {
          opacity: 0.5;
        }
      `}</style>
    </>
  );
};
