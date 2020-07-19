import { Router } from 'express';
import { index } from '../controllers/orderController';
import { protect } from '../middleware';

const router = Router();

router.route('/').get(protect, index);

export { router as orderRoutes };
