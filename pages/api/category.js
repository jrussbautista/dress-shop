import connectDB from '../../utils/connectDB';
import Product from '../../models/Product';

export default async (req, res) => {
  await connectDB();
  try {
    let { category } = req.query;
    category = category.toLowerCase();
    const products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting categories');
  }
};
