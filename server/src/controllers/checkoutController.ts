import { Request, Response } from 'express';
import { Cart, User, Order } from '../models';
import { User as UserType } from '../types';
import { createPaymentIntent } from '../lib/stripe';
import { client } from '../lib/paypal';
const paypal = require('@paypal/checkout-server-sdk');

const getCart = async (req: Request) => {
  const user = req.user as UserType;
  return await Cart.findOne({ user: user._id }).populate('items.product');
};

const calculateCartTotal = async (req: Request) => {
  const cart = await getCart(req);
  const total = cart?.items.reduce(
    (acc: any, el: any) => acc + el.product.price * el.quantity,
    0
  );
  return total;
};

const createOrder = async (
  userId: string,
  amount: number,
  paymentMethod: string
) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) return;

  const order = await Order.create({
    user: userId,
    total: amount,
    items: cart.items,
    paymentMethod,
  });

  await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { items: [] } });

  return order;
};

export const createStripeCharge = async (req: Request, res: Response) => {
  const user = req.user as UserType;
  const { paymentMethodId } = req.body;
  try {
    const totalAmount = await calculateCartTotal(req);
    await createPaymentIntent(totalAmount, paymentMethodId);
    const order = await createOrder(user._id, totalAmount, 'stripe');
    res.status(200).json({ data: order });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Unexpected error occured. Please try again later.' });
  }
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
    return res
      .status(500)
      .send({ message: 'Unexpected error occured. Please try again later.' });
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

    await createOrder(user._id, amount, 'paypal');
  } catch (err) {
    return res.send(500);
  }

  // 6. Return a successful response to the client
  res.send(200);
};
