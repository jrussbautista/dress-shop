import connectDB from "../../utils/connectDB";
import jwt from "jsonwebtoken";
import User from "../../models/User";

export default async (req, res) => {
  await connectDB();
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      break;
    default:
      res.status(405).send(`Method not allowed`);
  }
};

async function handleGetRequest(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const user = await User.findOne({ _id: userId });
    if (!user) res.status(404).send("User not found");
    res.status(200).json(user);
  } catch (error) {
    res.status(403).send("Invalid token");
  }
}
