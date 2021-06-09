import { Router } from 'express';
import { index, store, remove } from '../controllers/cartController';
import { protect } from '../middleware';

const router = Router();

router.route('/').get(protect, index).post(protect, store);

router.route('/:id').delete(protect, remove);

export { router as cartRoutes };
