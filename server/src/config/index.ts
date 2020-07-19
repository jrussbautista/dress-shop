export const IS_PROD = process.env.NODE_ENV === 'production';
export const PORT = process.env.PORT || 5000;
export const DATABASE_URI = IS_PROD
  ? process.env.DATABASE_URI_PROD
  : process.env.DATABASE_URI_LOCAL;
export const JWT_SECRET_KEY = `${process.env.JWT_SECRET}`;
export const JWT_EXPIRES_IN = '7d';
export const STRIPE_SECRET_KEY = `${process.env.STRIPE_SECRET_API_KEY}`;
