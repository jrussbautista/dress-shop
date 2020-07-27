import { Router } from 'express';
import {
  createPaymentIntent,
  triggerWebhook,
  createPaypalTransaction,
  capturePaypalTransaction,
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

router
  .route('/create-paypal-transaction')
  .post(protect, createPaypalTransaction);

router
  .route('/capture-paypal-transaction')
  .post(protect, capturePaypalTransaction);

export { router as checkOutRoutes };
