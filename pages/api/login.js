import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import connectDB from "../../utils/connectDB";

connectDB();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if email is exist
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).send("Email does not exist");
    // // check if user password match in db
    const isPasswordMatch = await bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch)
      return res.status(401).send("Email or password does not match");
    //create token to login user
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    //send token to client
    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in user. Please try to login again");
  }
};
