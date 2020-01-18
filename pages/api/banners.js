import connectDB from '../../utils/connectDB';
import Banner from '../../models/Banner';

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
    const banners = await Banner.find();
    res.status(200).json({ banners });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting categories');
  }
}
