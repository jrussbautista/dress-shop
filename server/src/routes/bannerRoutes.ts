import { Router } from 'express';
import { index } from '../controllers/bannerController';

const router = Router();

router.route('/').get(index);

export { router as bannerRoutes };
