import { Router } from 'express';
import { login, signUp, getMe } from '../controllers/authController';
import { protect } from '../middleware';

const router = Router();

router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/me').get(protect, getMe);

export { router as authRoutes };
