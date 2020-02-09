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
  let query;

  // Copy req.query
  let reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'keyword'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  if (req.query.keyword) {
    reqQuery = { ...reqQuery, $text: { $search: req.query.keyword } };
  }

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // products = await Product.find({ $text: { $search: keyword } }).sort(sort);

  // Finding resource
  query = Product.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalProducts = await Product.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const products = await query;

  res.status(200).json({ products, totalProducts, count: products.length });
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
