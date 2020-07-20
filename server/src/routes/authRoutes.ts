import { Router } from 'express';
import {
  login,
  signUp,
  getMe,
  loginViaGoogle,
} from '../controllers/authController';
import { protect } from '../middleware';
import passport from 'passport';

const router = Router();

router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/me').get(protect, getMe);
router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router
  .route('/google/callback')
  .get(passport.authenticate('google'), loginViaGoogle);

export { router as authRoutes };
