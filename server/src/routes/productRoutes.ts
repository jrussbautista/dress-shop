import { Router } from 'express';
import { index, show, store, update } from '../controllers/productController';
import { authorize, protect } from '../middleware';

const router = Router();

router.route('/').get(index).post(protect, authorize('admin'), store);

router.route('/:id').get(show).patch(protect, authorize('admin'), update);

export { router as productRoutes };
