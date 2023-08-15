import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getAllProductsByUserId,
  updatedProduct,
} from "../controllers/productController";
import { idValidMiddleware } from "../middleware/idValidMiddleware";
import { authenticationMiddleware } from "../middleware/authenticationMiddleware";
import { productValidationMiddleware } from "../middleware/productValidationMiddleware";
import { roleAuthorizationMiddleware } from "../middleware/roleAuthorizationMiddleware";

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
