import { Router } from 'express';
import {
  createPaymentIntent,
  triggerWebhook,
} from '../controllers/checkoutController';
import { protect } from '../middleware';

const router = Router();

router
  .route('/stripe/create-payment-intent')
  .post(protect, createPaymentIntent);

router.route('/stripe/webhook').post(triggerWebhook);

export { router as checkOutRoutes };
