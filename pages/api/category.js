import connectDB from '../../utils/connectDB';
import Product from '../../models/Product';

export default async (req, res) => {
  await connectDB();
  try {
    let { category, price, keyword } = req.query;
    let sort;
    let products = [];

    if (price) {
      sort = price === 'low' ? { price: 1 } : { price: -1 };
    } else {
      sort = { _id: 'desc' };
    }

    if (keyword) {
      products = await Product.find({ $text: { $search: keyword } }).sort(sort);
    } else if (category) {
      products = await Product.find({ category }).sort(sort);
    }

    // if (price) {
    //   if (price === 'low') {
    //     sort = 1;
    //   } else {
    //     sort = -1;
    //   }
    //   products = await Product.find({ category }).sort({ price: sort });
    // } else {
    //   products = await Product.find({ category });
    // }
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting categories');
  }
};
