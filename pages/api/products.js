import connectDB from '../../utils/connectDB';
import Product from '../../models/Product';

export default async (req, res) => {
  await connectDB();
  let { currentPage, pageSize } = req.query;
  let products = [];
  const totalProducts = await Product.countDocuments();
  currentPage = Number(currentPage);
  pageSize = Number(pageSize);

  if (currentPage === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    const skips = pageSize * (currentPage - 1);
    products = await Product.find()
      .skip(skips)
      .limit(pageSize);
  }
  res.json({ products, totalProducts });
};
