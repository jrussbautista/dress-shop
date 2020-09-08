export const IS_PROD = process.env.NODE_ENV === 'production';

export const API_URL = IS_PROD
  ? 'https://dress-shop-api.vercel.app/api'
  : 'http://localhost:5000/api';

export const GOOGLE_CLIENT_ID = `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`;

export const PAGE_LIMIT = 12;
export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export const STRIPE_CLIENT_KEY = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KY}`;

export const MAX_FILE_SIZE = 1024 * 1024; // 1mb

export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
