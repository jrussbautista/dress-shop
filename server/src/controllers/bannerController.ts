import { Request, Response } from 'express';
import { Banner } from '../models';

export const index = async (req: Request, res: Response) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({ data: { banners }, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error in getting products', success: false });
  }
};
