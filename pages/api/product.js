import connectDB from "../../utils/connectDB";
import Product from "../../models/Product";

export default async (req, res) => {
  await connectDB();
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    default:
      res.status(405).send("Method not allowed");
      break;
  }
};

async function handleGetRequest(req, res) {
  const { id } = req.query;
  try {
    const product = await Product.findOne({ _id: id });
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).send("Product not exist");
  }
}
