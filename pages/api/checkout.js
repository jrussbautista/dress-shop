import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import Order from "../../models/Order";
import connectDB from "../../utils/connectDB";
import calculateCartTotal from "../../utils/calculateCartTotal";
import Stripe from "stripe";
import uuid from "uuid/v4";

const stripe = Stripe(process.env.STRIPE_KEY);

export default async (req, res) => {
  await connectDB();

  const { paymentData } = req.body;

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // find cart based on User Id
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "carts.product",
      model: "Product"
    });
    // calculate cart total
    const { cartTotal, stripeTotal } = calculateCartTotal(cart.carts);
    //get email from paymentData
    const prevCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1
    });

    const isExistingCustomer = prevCustomer.data.length > 0;
    let newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id
      });
    }
    const customer =
      (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;
    // create charge
    const charge = await stripe.charges.create(
      {
        currency: "PHP",
        amount: stripeTotal,
        receipt_email: paymentData.email,
        customer,
        description: `Checkout | ${paymentData.email} | ${paymentData.id}`
      },
      {
        idempotencyKey: uuid()
      }
    );
    //add order to database
    await new Order({
      user: userId,
      email: paymentData.email,
      total: cartTotal,
      products: cart.carts
    }).save();
    //clear products in cart
    await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { carts: [] } });
    res.status(200).send("Checkout successful");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in processing your order. Please try again");
  }
};
