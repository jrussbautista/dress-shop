import { Router } from 'express';
import {
  createPaymentIntent,
  triggerWebhook,
} from '../controllers/checkoutController';
import { protect } from '../middleware';
import bodyParser from 'body-parser';

const router = Router();

router
  .route('/stripe/create-payment-intent')
  .post(protect, createPaymentIntent);

router
  .route('/stripe/webhook')
  .post(bodyParser.raw({ type: 'application/json' }), triggerWebhook);

export { router as checkOutRoutes };
