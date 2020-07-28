import { Router } from 'express';
import {
  login,
  signUp,
  getMe,
  loginViaGoogle,
  changePassword,
} from '../controllers/authController';
import { protect } from '../middleware';
import { validate, loginValidation, signUpValidation } from '../validation';

const router = Router();

router.route('/signup').post(signUpValidation(), validate, signUp);
router.route('/login').post(loginValidation(), validate, login);
router.route('/google').post(loginViaGoogle);

router.use(protect);

router.route('/me').get(getMe);

router.route('/change-password').patch(changePassword);

export { router as authRoutes };
