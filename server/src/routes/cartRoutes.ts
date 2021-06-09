import { Router } from 'express';
import { index, store, remove, update } from '../controllers/cartController';
import { protect } from '../middleware';

const router = Router();

router
  .route('/')
  .get(protect, index)
  .post(protect, store)
  .delete(protect, remove)
  .put(protect, update);

export { router as cartRoutes };
