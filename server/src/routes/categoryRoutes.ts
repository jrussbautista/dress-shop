import { Router } from 'express';
import { index } from '../controllers/categoryController';

const router = Router();

router.route('/').get(index);

export { router as categoryRoutes };
