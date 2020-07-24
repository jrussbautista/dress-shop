require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { connectDb } from './database';
import {
  productRoutes,
  authRoutes,
  cartRoutes,
  bannerRoutes,
  categoryRoutes,
  checkOutRoutes,
  orderRoutes,
} from './routes';
import { PORT } from './config';
import passport from 'passport';

// initialize passport
require('./lib/passport');

const app = express();

const start = async () => {
  // connect to db
  await connectDb();

  app.use(cors());
  app.use(express.json());
  app.use(passport.initialize());

  // setup routes
  app.use('/api/auth', authRoutes);
  app.use('/api/banners', bannerRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/carts', cartRoutes);
  app.use('/api/checkout', checkOutRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

start();
