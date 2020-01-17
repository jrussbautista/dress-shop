import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import Product from "../../models/Product";
import connectDB from "../../utils/connectDB";

const { ObjectId } = mongoose.Types;

export default async (req, res) => {
  await connectDB();
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(422).send("Unknown method");
  }
};

async function handleGetRequest(req, res) {
  if (!req.headers.authorization) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "carts.product",
      model: "Product"
    });
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in fetching cart");
  }
}

async function handlePostRequest(req, res) {
  const { productId, quantity } = req.body;
  if (!req.headers.authorization) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      //check if product in cart already exist
      const productExist = cart.carts.some(cart =>
        ObjectId(productId).equals(cart.product)
      );
      if (productExist) {
        //add 1 to quantity of product
        await Cart.findOneAndUpdate(
          { _id: cart._id, "carts.product": productId },
          {
            $inc: { "carts.$.quantity": quantity }
          }
        );
      } else {
        const newProduct = { quantity, product: productId };
        await Cart.findOneAndUpdate(
          { _id: cart._id },
          {
            $addToSet: { carts: newProduct }
          }
        );
      }
    } else {
      await new Cart({
        user: userId,
        carts: [{ quantity, product: productId }]
      }).save();
    }
    res.status(200).send("Successfully added to cart");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in adding cart");
  }
}

async function handleDeleteRequest(req, res) {
  const { cartId } = req.query;
  if (!req.headers.authorization) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { carts: { _id: cartId } } }
    );
    res.status(200).send("Successfully cart deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in deleting cart");
  }
}
