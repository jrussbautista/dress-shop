import connectDB from '../../utils/connectDB';
import Category from '../../models/Category';

export default async (req, res) => {
  await connectDB();
  switch (req.method) {
    case 'GET':
      await handleGet(req, res);
      break;
    default:
      break;
  }
};

async function handleGet(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting categories');
  }
}
