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
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in creating product');
  }
}
