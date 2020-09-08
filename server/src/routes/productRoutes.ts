import { Router } from "express";
import {
  index,
  show,
  store,
  update,
  remove,
} from "../controllers/productController";
import { authorize, protect } from "../middleware";
import { productValidation, validate } from "../validation";

const router = Router();

router
  .route("/")
  .get(index)
  .post(protect, authorize("admin"), productValidation(), validate, store);

router
  .route("/:id")
  .get(show)
  .delete(protect, authorize("admin"), remove)
  .patch(protect, authorize("admin"), update);

export { router as productRoutes };
