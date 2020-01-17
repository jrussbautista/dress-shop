import connectDB from "../../utils/connectDB";
import Order from "../../models/Order";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  await connectDB();

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const orders = await Order.find({ user: userId }).populate({
      path: "products.product",
      model: "Product"
    });
    res.json({ orders });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in fetching orders. Please login again");
  }
};
