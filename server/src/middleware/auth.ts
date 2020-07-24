import { Response, Request, NextFunction } from 'express';
import passport from 'passport';
import { User } from '../types';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate('jwt', { session: false }, function (
    err,
    user,
    info
  ) {
    if (err) {
      return next(info);
    }
    if (!user)
      return res.status(401).json({
        error: {
          message: 'Not Authorized',
          name: 'AUTHENTICATION_FAILURE',
        },
        success: false,
      });
    req.user = user;
    return next();
  })(req, res, next);
};

export const authorize = (roles: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        error: {
          name: 'Unauthorized',
          message: 'You are not authorize to perform this action',
        },
        success: false,
      });
    }
    next();
  };
};
