import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

export const loginValidation = () => {
  return [
    body('email').isEmail().withMessage('Email is not a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Must be at least 6 chars long'),
  ];
};

export const signUpValidation = () => {
  return [
    body('name')
      .isLength({ min: 6 })
      .withMessage('Name must be at least 6 chars long'),
    body('email').isEmail().withMessage('Email is not a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 chars long'),
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
    message: 'The given data was invalid',
    errors: extractedErrors,
  });
};
