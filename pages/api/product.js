import connectDB from '../../utils/connectDB';
import Product from '../../models/Product';
import Cart from '../../models/Cart';

export default async (req, res) => {
  await connectDB();
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res);
      break;
    case 'DELETE':
      await handleDelete(req, res);
      break;
    default:
      res.status(405).send('Method not allowed');
      break;
  }
};

async function handleGetRequest(req, res) {
  const { id } = req.query;
  try {
    const product = await Product.findOne({ _id: id });
    const { category } = product;
    // find related products based on category
    const relatedProducts = await Product.find({
      category,
      _id: { $ne: id }
    }).limit(8);
    res.status(200).json({ product, relatedProducts });
  } catch (error) {
    console.error(error);
    res.status(400).send('Product not exist');
  }
}

async function handleDelete(req, res) {
  const { id } = req.query;
  try {
    // remove product from db
    await Product.findOneAndDelete({ _id: id });
    // remove product from all carts
    await Cart.updateMany(
      { 'carts.product': id },
      { $pull: { carts: { product: id } } }
    );
    res.json({ success: true, message: 'Successfully delete ' });
  } catch (error) {
    console.log(error);
  }
}
