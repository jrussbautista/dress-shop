import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '../config';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
});

export const createPaymentIntent = async (
  amount: number
): Promise<string | null> => {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'php',
  });

  return paymentIntent.client_secret;
};
