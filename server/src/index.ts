require("dotenv").config();

import express from "express";
import cors from "cors";
import { connectDb } from "./database";
import {
  productRoutes,
  authRoutes,
  cartRoutes,
  bannerRoutes,
  categoryRoutes,
  checkOutRoutes,
  orderRoutes,
  userRoutes,
  dashboardRoutes,
} from "./routes";
import { PORT } from "./config";
import passport from "passport";
import bodyParser from "body-parser";

// initialize passport
require("./lib/passport");

const app = express();

const start = async () => {
  // connect to db
  await connectDb();

  app.use(cors());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(passport.initialize());

  // setup routes
  app.use("/api/auth", authRoutes);
  app.use("/api/banners", bannerRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/carts", cartRoutes);
  app.use("/api/checkout", checkOutRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/dashboard", dashboardRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

start();
