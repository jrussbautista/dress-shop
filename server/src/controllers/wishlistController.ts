import { Request, Response } from 'express';
import { Wishlist } from '../models';
import { User as UserTypes } from '../types';

export const index = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTypes;
    const wishlist = await Wishlist.find({ user: user._id }).populate(
      'product'
    );
    res.status(200).json({ data: wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error in getting wishlist' });
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTypes;
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({
      user: user._id,
      product: productId,
    });

    if (wishlist) {
      return res
        .status(409)
        .json({ message: 'Product is already in  wishlist' });
    }

    wishlist = await Wishlist.create({ product: productId, user: user._id });
    wishlist = await wishlist.populate('product').execPopulate();

    res.status(200).json({ data: wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error in adding wishlist' });
  }
};
