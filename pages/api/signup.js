import connectDB from "../../utils/connectDB";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  await connectDB();
  const { name, email, password } = req.body;
  //Validate user input
  if (!isLength(name, { min: 3, max: 10 })) {
    return res.status(422).send("Name must be 3 - 10 characters long");
  }
  if (!isLength(password, { min: 6 })) {
    return res.status(422).send("Password must be 6 characters long");
  }
  if (!isEmail(email)) {
    return res.status(422).send("Email must be valid");
  }
  // check if user is exist in db
  const user = await User.findOne({ email });
  if (user) {
    return res.status(422).send("Email is already taken");
  }
  //hash user password
  const hash = await bcrypt.hashSync(password, 10);
  try {
    //create new user
    const newUser = await new User({ name, email, password: hash }).save();
    //create token for new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    //send back token to client
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in creating in users. Please try again");
  }
};
