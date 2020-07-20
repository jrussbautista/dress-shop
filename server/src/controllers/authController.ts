import { Request, Response, NextFunction } from 'express';
import { JWT_EXPIRES_IN, JWT_SECRET_KEY, CLIENT_PUBLIC_URL } from '../config';
import { User } from '../types';
import passport from 'passport';
import jwt from 'jsonwebtoken';

export const sendResponseToken = ({
  user,
  res,
  statusCode,
}: {
  user: User;
  statusCode: number;
  res: Response;
}) => {
  const payload = {
    user_id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  res.status(statusCode).json({ data: { user, token }, success: true });
};

export const loginViaGoogle = async (req: Request, res: Response) => {
  const user = req.user as User;

  const payload = {
    user_id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });
  res.redirect(`${CLIENT_PUBLIC_URL}/login?token=${token}`);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('login', { session: false }, function (
    err,
    user,
    info
  ) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(500).json({ error: { message: info.message } });
    }

    sendResponseToken({ user, res, statusCode: 200 });
  })(req, res, next);
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('signUp', { session: false }, function (
    err,
    user,
    info
  ) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(500).json({ error: { message: info.message } });
    }

    sendResponseToken({ user, res, statusCode: 201 });
  })(req, res, next);
};

export const getMe = async (req: Request, res: Response) => {
  res.status(200).json({ data: { user: req.user } });
};
