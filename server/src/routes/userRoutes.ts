import { Router } from 'express';
import { update } from '../controllers/userController';
import { protect } from '../middleware';

const router = Router();

router.use(protect);

router.route('/:id').patch(update);

export { router as userRoutes };
