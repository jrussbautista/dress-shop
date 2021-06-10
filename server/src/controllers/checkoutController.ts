import { Request, Response } from 'express';
import { Cart, User, Order } from '../models';
import { User as UserType } from '../types';
import { createPaymentIntent as stripeCreatePaymentIntent } from '../lib/stripe';
import { client } from '../lib/paypal';
const paypal = require('@paypal/checkout-server-sdk');

const getCart = async (req: Request) => {
  const user = req.user as UserType;
  return await Cart.findOne({ user: user._id }).populate('product');
};

const calculateCartTotal = async (req: Request): Promise<number> => {
  const cart = await getCart(req);
  const total = cart?.items.reduce(
    (acc: any, el: any) => acc + el.product.price * el.quantity,
    0
  );
  return total;
};

const createOrder = async (userId: string, amount: number) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) return;

  await Order.create({ user: userId, total: amount, items: cart.items });

  await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { items: [] } });
};

// send client secret to client
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    // calculate stripe amount
    const cartTotal = await calculateCartTotal(req);
    const stripeAmount = cartTotal * 100;
    const clientSecret = await stripeCreatePaymentIntent(stripeAmount);

    res.status(200).json({
      data: {
        clientSecret,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// trigger webhook for stripe payment
export const triggerWebhook = async (req: Request, res: Response) => {
  const event = req.body;
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;

      const user = await User.findOne({ email: paymentIntent.receipt_email });
      const amount = paymentIntent.amount / 100;

      await createOrder(user?._id, amount);
      console.log('PaymentIntent was successful!');
      break;
    default:
      // Unexpected event type
      return res.status(400).end();
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
};

export const createPaypalTransaction = async (req: Request, res: Response) => {
  const total = await calculateCartTotal(req);
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'PHP',
          value: total,
        },
      },
    ],
  });

  let order;
  try {
    order = await client().execute(request);
  } catch (err) {
    return res.send(500);
  }

  res.status(200).json({
    data: {
      orderID: order.result.id,
    },
  });
};

export const capturePaypalTransaction = async (req: Request, res: Response) => {
  const user = req.user as UserType;
  const orderID = req.body.orderID;

  // 3. Call PayPal to capture the order
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client().execute(request);
    const amount =
      capture.result.purchase_units[0].payments.captures[0].amount.value;

    await createOrder(user._id, amount);
  } catch (err) {
    return res.send(500);
  }

  // 6. Return a successful response to the client
  res.send(200);
};
