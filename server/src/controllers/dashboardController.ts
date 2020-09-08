import { Request, Response } from "express";
import { Product, User, Order } from "../models";

export const index = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().countDocuments();
    const users = await User.find().countDocuments();
    const orders = await Order.find().countDocuments();
    res.status(200).json({ data: { products, users, orders }, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getting dashboard", success: false });
  }
};
