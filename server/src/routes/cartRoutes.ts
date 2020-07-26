import { Router } from 'express';
import { index, store, remove, update } from '../controllers/cartController';
import { protect } from '../middleware';

const router = Router();

router.route('/').get(protect, index).post(protect, store);

router.route('/:id').delete(protect, remove);
router.route('/:id').patch(protect, update);

export { router as cartRoutes };
