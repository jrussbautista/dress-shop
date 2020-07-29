import { Router } from 'express';
import { update } from '../controllers/userController';
import { protect } from '../middleware';
import { updateProfileValidation, validate } from '../validation';

const router = Router();

router.use(protect);

router.route('/:id').patch(updateProfileValidation(), validate, update);

export { router as userRoutes };
