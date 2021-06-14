import { Router } from 'express';
import { index, store, destroy } from '../controllers/wishlistController';
import { protect } from '../middleware';

const router = Router();

router
  .route('/')
  .get(protect, index)
  .post(protect, store)
  .delete(protect, destroy);

export { router as wishlistRoutes };
