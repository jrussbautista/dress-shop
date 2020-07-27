import { Request, Response } from 'express';
import { Product } from '../models';
import APIFeatures from '../lib/ApiFeatures';

export const index = async (req: Request, res: Response) => {
  try {
    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const total = await Product.find().countDocuments();

    const products = await features.query;

    res.status(200).json({ data: { products, total }, success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Error in getting products', success: false });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res
        .status(404)
        .json({ message: 'Product not found', success: false });

    // find related products based on product category
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: id },
    }).limit(8);

    res.status(200).json({ data: { product, relatedProducts }, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error in getting product', success: false });
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const { name, price, description, imageURL, category, stocks } = req.body;
    const product = await Product.create({
      name,
      price,
      description,
      imageURL,
      category,
      stocks,
    });
    res.status(200).json({ data: { product }, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error in creating product', success: false });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  let product = await Product.findOne({ _id: id });

  if (!product)
    return res
      .status(404)
      .json({ message: 'Product not found', success: false });

  product.remove();

  res.status(200).json({ data: {}, success: true });
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let product = await Product.findOne({ _id: id });

    if (!product)
      return res
        .status(404)
        .json({ message: 'Product not found', success: false });

    product = await Product.findOneAndUpdate({ _id: product._id }, req.body, {
      new: true,
    });

    res.status(200).json({ data: { product }, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error in creating product', success: false });
  }
};
