import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const loginValidation = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Email is not a valid email")
      .trim()
      .escape(),
    body("password")
      .isLength({ min: 6 })
      .trim()
      .escape()
      .withMessage("Must be at least 6 chars long"),
  ];
};

export const signUpValidation = () => {
  return [
    body("name")
      .isLength({ min: 6 })
      .withMessage("Name must be at least 6 chars long")
      .trim()
      .escape(),
    body("email")
      .isEmail()
      .withMessage("Email is not a valid email")
      .trim()
      .escape(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 chars long")
      .trim()
      .escape(),
  ];
};

export const updateProfileValidation = () => {
  return [
    body("name")
      .isLength({ min: 6 })
      .withMessage("Name must be at least 6 chars long")
      .trim()
      .escape(),
    body("email")
      .isEmail()
      .withMessage("Email is not a valid email")
      .trim()
      .escape(),
  ];
};

export const changePasswordValidation = () => {
  return [
    body("oldPassword")
      .isLength({ min: 6 })
      .withMessage("Old Password must be at least 6 chars long")
      .trim()
      .escape(),
    body("newPassword")
      .isLength({ min: 6 })
      .trim()
      .escape()
      .withMessage("New Password must be at least 6 chars long"),
    body("confirmNewPassword")
      .isLength({ min: 6 })
      .trim()
      .escape()
      .withMessage("Confirm New Password must be at least 6 chars long"),
  ];
};

export const productValidation = () => {
  return [
    body("name")
      .isLength({ min: 6 })
      .withMessage("Name must be at least 6 chars long")
      .trim()
      .escape(),
    body("price")
      .isNumeric()
      .trim()
      .escape()
      .withMessage("Price must be a number"),
    body("description")
      .isLength({ min: 6, max: 400 })
      .trim()
      .escape()
      .withMessage("Name must be at least 6 chars long"),
    body("image")
      .isLength({ min: 1 })
      .trim()
      .withMessage("Image is required field"),
    body("category")
      .isLength({ min: 3 })
      .trim()
      .escape()
      .withMessage("Category is required field"),
  ];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: Object[] = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    message: "The given data was invalid",
    errors: extractedErrors,
  });
};
