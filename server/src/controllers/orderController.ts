import { Request, Response } from 'express';
import { User as UserTypes } from '../types';
import { Order } from '../models';

export const index = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTypes;
    const orders = await Order.find({ user: user._id }).populate(
      'products.product'
    );
    res.status(200).json({ data: { orders }, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ error: { message: 'Error in getting orders' } });
  }
};
