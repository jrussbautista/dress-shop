"use strict";
exports.__esModule = true;
exports.IS_PROD = process.env.NODE_ENV;
exports.PORT = exports.IS_PROD || 5000;
exports.DATABASE_URI = exports.IS_PROD
    ? process.env.DATABASE_URI_PROD
    : process.env.DATABASE_URI_LOCAL;
exports.JWT_SECRET_KEY = "" + process.env.JWT_SECRET;
exports.JWT_EXPIRES_IN = '7d';
exports.STRIPE_SECRET_KEY = "" + process.env.STRIPE_SECRET_API_KEY;
