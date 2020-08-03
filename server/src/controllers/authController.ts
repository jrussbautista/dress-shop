import { Request, Response, NextFunction } from "express";
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "../config";
import { User as UserType, Role } from "../types";
import { Google } from "../lib/google";
import { User, UserDocument } from "../models";
import passport from "passport";
import jwt from "jsonwebtoken";

export const sendResponseToken = ({
  user,
  res,
  statusCode,
}: {
  user: UserType | UserDocument;
  statusCode: number;
  res: Response;
}) => {
  const payload = {
    user_id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  // remove password from response
  user.password = undefined;

  res.status(statusCode).json({ data: { user, token }, success: true });
};

export const loginViaGoogle = async (req: Request, res: Response) => {
  const idToken = req.body.idToken;
  if (!idToken)
    return res.status(402).json({ error: { message: "Id token is required" } });
  try {
    const response = await Google.verifyIdToken(idToken);
    if (!response)
      return res.status(500).json({
        error: { message: "Error in logging in. Please try again later" },
      });

    const name = response.name as string;
    const email = response.email as string;
    const googleId = response.sub;
    const imageURL = response.picture;

    let user = await User.findOne({
      googleId,
    });

    // create user if does not exists in db
    if (!user) {
      user = await User.create({
        googleId,
        name,
        imageURL,
        email,
        carts: [],
        role: Role.User,
      });
    }

    sendResponseToken({ user, res, statusCode: 200 });
  } catch (error) {
    res.status(500).json({ error: { message: "Error in logging in" } });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("login", { session: false }, function (
    err,
    user,
    info
  ) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    sendResponseToken({ user, res, statusCode: 200 });
  })(req, res, next);
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("signUp", { session: false }, function (
    err,
    user,
    info
  ) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    sendResponseToken({ user, res, statusCode: 201 });
  })(req, res, next);
};

export const getMe = async (req: Request, res: Response) => {
  res.status(200).json({ data: { user: req.user } });
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserType;
    const { newPassword, oldPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res.status(402).json({
        message: "New Password and Confirm New Password does not match",
      });
    }

    const foundUser = await User.findById(user._id).select("+password");

    if (!foundUser) return res.status(404).json({ message: "User not found " });

    const isPasswordCorrect = await foundUser.matchesPassword(oldPassword);

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Old password is incorrect" });

    foundUser.password = newPassword;
    await foundUser.save();

    sendResponseToken({ user: foundUser, res, statusCode: 200 });
  } catch (error) {
    res.status(500).json({ message: "Error in updating password." });
  }
};
