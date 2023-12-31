import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getAllProductsByUserId,
  updatedProduct,
  updateFeatureProduct
} from "../controllers/productController";
import { idValidMiddleware } from "../middleware/idValidMiddleware";
import { authenticationMiddleware } from "../middleware/authenticationMiddleware";
import { productValidationMiddleware } from "../middleware/productValidationMiddleware";
import { roleAuthorizationMiddleware } from "../middleware/roleAuthorizationMiddleware";
import { featureProductValidationMiddleware } from "../middleware/featureProductValidationMiddleware";

const router = express.Router();

router.param("id", idValidMiddleware);

router
  .route("/")
  .get(
    authenticationMiddleware,   
    getAllProducts
  )
  .post(
    productValidationMiddleware,
    authenticationMiddleware,
    roleAuthorizationMiddleware("Admin"),
    createProduct
  );

router
  .route("/feature")
  .patch(
    featureProductValidationMiddleware,
    authenticationMiddleware,
    roleAuthorizationMiddleware("Admin"),
    updateFeatureProduct
  );

router
  .route("/:id")
  .delete(
    authenticationMiddleware,
    roleAuthorizationMiddleware("Admin"),
    deleteProduct
  )
  .get(authenticationMiddleware, getProductById)
  .patch(
    productValidationMiddleware,
    authenticationMiddleware,
    roleAuthorizationMiddleware("Admin"),
    updatedProduct
  );

router
  .route("/users/:userId")
  .get(authenticationMiddleware, getAllProductsByUserId);

export default router;
