import { Request, Response } from 'express';
import { Cart, User } from '../models';
import { User as UserType } from '../types';
import { createPaymentIntent as stripeCreatePaymentIntent } from '../lib/stripe';

const calculateCartTotal = (carts: any): number => {
  const total = carts.reduce(
    (acc: any, el: any) => acc + el.product.price * el.quantity,
    0
  );
  return total;
};

const getCarts = async (req: Request) => {
  const user = req.user as UserType;
  return await Cart.find({ user: user._id }).populate('product');
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const carts = await getCarts(req);
    // calculate stripe amount
    const stripeAmount = calculateCartTotal(carts) * 100;
    const clientSecret = await stripeCreatePaymentIntent(stripeAmount);

    res.status(200).json({
      data: {
        clientSecret,
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const createOrder = async (session: { customer_email: string }) => {
  const user = await User.findOne({ email: session.customer_email });
};

export const triggerWebhook = async (req: Request, res: Response) => {
  let event;

  try {
    event = JSON.parse(req.body);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(paymentIntent);
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return res.status(400).end();
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
};
