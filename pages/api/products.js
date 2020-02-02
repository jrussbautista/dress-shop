import connectDB from '../../utils/connectDB';
import Product from '../../models/Product';

export default async (req, res) => {
  await connectDB();
  switch (req.method) {
    case 'GET':
      await handleGet(req, res);
      break;
    case 'POST':
      await handlePost(req, res);
    default:
      break;
  }
};

async function handleGet(req, res) {
  let { page, limit } = req.query;
  let products = [];
  const totalProducts = await Product.countDocuments();
  page = Number(page);
  limit = Number(limit);

  if (page === 1) {
    products = await Product.find().limit(limit);
  } else {
    const skips = limit * (page - 1);
    products = await Product.find()
      .skip(skips)
      .limit(limit);
  }
  res.status(200).json({ products, totalProducts });
}

async function handlePost(req, res) {
  const { name, price, description, imageURL, category } = req.body;
  try {
    const product = await new Product({
      name,
      price,
      description,
      imageURL,
      category
    }).save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in creating product');
  }
}
