export const IS_PROD = process.env.NODE_ENV === 'production';

export const API_URL = IS_PROD
  ? 'https://dress-shop-api.vercel.app/api'
  : 'http://localhost:5000/api';

export const PAGE_LIMIT = 12;
export const PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT_ID;

export const STRIPE_CLIENT_KEY = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KY}`;
