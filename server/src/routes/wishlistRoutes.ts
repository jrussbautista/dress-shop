import { Router } from 'express';
import { index, store } from '../controllers/wishlistController';
import { protect } from '../middleware';

const router = Router();

router.route('/').get(protect, index).post(protect, store);

export { router as wishlistRoutes };
