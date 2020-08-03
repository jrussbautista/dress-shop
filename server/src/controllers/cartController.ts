import { Request, Response } from "express";
import { Cart, User } from "../models";
import { User as UserTypes } from "../types";

export const index = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTypes;
    const carts = await Cart.find({ user: user._id })
      .populate("product")
      .sort("-createdAt");
    res.status(200).json({ data: { carts } });
  } catch (error) {
    res.status(500).json({ message: "Error in getting product" });
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTypes;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: user._id, product: productId });

    if (cart) {
      // if cart is already exist update the quantity of the current cart
      cart = await Cart.findOneAndUpdate(
        { _id: cart.id },
        { $inc: { quantity } },
        { new: true }
      );
    } else {
      // update user cart
      await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { carts: productId } }
      );
      cart = await Cart.create({
        product: productId,
        user: user._id,
        quantity,
      });
    }

    res.status(200).json({ data: { cart } });
  } catch (error) {
    res.status(500).json({ message: "Error in getting product" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTypes;
    const { id } = req.params;

    const cart = await Cart.findOne({ _id: id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // make sure viewer is the owner of the cart
    if (user._id.toString() !== cart.user.toString()) {
      return res.status(405).json({
        message: "You cannot perform this operation",
      });
    }

    await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { carts: cart.product } }
    );

    await cart.remove();

    res.status(204).json({ data: null });
  } catch (error) {
    res.status(500).json({ message: "Error in getting product" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTypes;
    const { id } = req.params;

    const { quantity } = req.body;

    let cart = await Cart.findOne({ _id: id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // make sure viewer is the owner of the cart
    if (user._id.toString() !== cart.user.toString()) {
      return res.status(405).json({
        message: "You cannot perform this operation",
      });
    }

    cart = await Cart.findOneAndUpdate(
      { _id: id },
      { quantity },
      { new: true }
    );

    return res.status(200).json({ data: { cart } });
  } catch (error) {
    res.status(500).json({ message: "Error in getting product" });
  }
};
