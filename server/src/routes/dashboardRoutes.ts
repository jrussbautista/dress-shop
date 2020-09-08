import { Router } from "express";
import { protect, authorize } from "../middleware";
import { index } from "../controllers/dashboardController";

const router = Router();

router.route("/").get(protect, authorize("admin"), index);

export { router as dashboardRoutes };
