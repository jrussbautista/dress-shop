import { Router } from 'express';
import {
  login,
  signUp,
  getMe,
  loginViaGoogle,
} from '../controllers/authController';
import { protect } from '../middleware';

const router = Router();

router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/me').get(protect, getMe);
router.route('/google').post(loginViaGoogle);

export { router as authRoutes };
