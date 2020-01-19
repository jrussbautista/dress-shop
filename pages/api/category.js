import connectDB from '../../utils/connectDB';
import Product from '../../models/Product';

export default async (req, res) => {
  await connectDB();
  try {
    let { category, price } = req.query;
    category = category.toLowerCase();
    let products = [];
    let sort;

    if (price) {
      if (price === 'low') {
        sort = 1;
      } else {
        sort = -1;
      }
      products = await Product.find({ category }).sort({ price: sort });
    } else {
      products = await Product.find({ category });
    }
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting categories');
  }
};
