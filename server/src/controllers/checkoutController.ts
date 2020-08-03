import { Request, Response } from "express";
import { Cart, User, Order } from "../models";
import { User as UserType } from "../types";
import { createPaymentIntent as stripeCreatePaymentIntent } from "../lib/stripe";
import mongoose from "mongoose";
const paypal = require("@paypal/checkout-server-sdk");
import { client } from "../lib/paypal";

const getCarts = async (req: Request) => {
  const user = req.user as UserType;
  return await Cart.find({ user: user._id }).populate("product");
};

const calculateCartTotal = async (req: Request): Promise<number> => {
  const carts = await getCarts(req);
  const total = carts.reduce(
    (acc: any, el: any) => acc + el.product.price * el.quantity,
    0
  );
  return total;
};

const createOrder = async (userId: string, amount: number) => {
  const carts = await Cart.find({ user: userId });
  const products = carts.map((cart) => ({
    quantity: cart.quantity,
    product: cart.product,
  }));

  await Order.create({ user: userId, total: amount, products });

  // remove user carts
  await User.findOneAndUpdate(
    { _id: userId },
    {
      carts: [],
    }
  );

  await Cart.remove({
    _id: {
      $in: carts.map((cart) => mongoose.Types.ObjectId(cart._id.toString())),
    },
  });
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
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;

      const user = await User.findOne({ email: paymentIntent.receipt_email });
      const amount = paymentIntent.amount / 100;

      await createOrder(user?._id, amount);
      console.log("PaymentIntent was successful!");
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
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "PHP",
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
