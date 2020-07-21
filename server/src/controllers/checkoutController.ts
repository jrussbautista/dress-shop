import { Request, Response } from 'express';
import { Cart, User, Order, Product } from '../models';
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

const createOrder = async (stripeData: any, res: Response) => {
  const user = await User.findOne({
    email: stripeData.receipt_email,
  });
  if (!user)
    return res.status(404).json({ error: { message: 'User not found' } });
  const total = stripeData.amount / 100;
  const carts = await Cart.find({ user: user._id });
  const products = carts.map((cart) => ({
    quantity: cart.quantity,
    product: cart.product,
  }));
  await Order.create({ user: user._id, total, products });
};

export const triggerWebhook = async (req: Request, res: Response) => {
  const event = req.body;

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      await createOrder(paymentIntent, res);
      console.log(paymentIntent);
      console.log('PaymentIntent was successful!');
      break;
    default:
      // Unexpected event type
      return res.status(400).end();
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
};
