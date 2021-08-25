import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '../config';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
});

export const createPaymentIntent = async (
  amount: number,
  paymentMethodId: string
): Promise<string | null> => {
  amount = amount * 100;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'php',
    confirm: true,
    payment_method: paymentMethodId,
  });

  return paymentIntent.client_secret;
};
