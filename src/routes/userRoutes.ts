import express from "express";
import {
  deleteUser,
  deleteUserByEmail,
  getAllUsers,
  getOneUser,
  signup as createUser,
  updateProfile as editUser,
} from "../controllers/authController";

import { authenticationMiddleware } from "../middleware/authenticationMiddleware";
import { roleAuthorizationMiddleware } from "../middleware/roleAuthorizationMiddleware";
import { userSignupValidationMiddleware as userCreateValidationMiddleware } from "../middleware/userSignupValidationMiddleware";
import { adminAndSelfAuthMiddleware } from "../middleware/adminAndSelfAuthMiddleware";
import { userEditProfileValidation } from "../validations/userEditProfileValidation";
import { userEditProfileValidationMiddleware } from "../middleware/userEditProfileValidationMiddleware";

const router = express.Router();

router
  .route("/")
  .get(
    authenticationMiddleware,
    roleAuthorizationMiddleware("Admin"),
    getAllUsers
  )
  .post(
    userCreateValidationMiddleware,
    authenticationMiddleware,
    roleAuthorizationMiddleware("Admin"),
    createUser
  );

router
  .route("/users-by-email")
  .delete(
    authenticationMiddleware,
    roleAuthorizationMiddleware("Admin"),
    deleteUserByEmail
  );

router
  .route("/:id")
  .delete(
    authenticationMiddleware,
    roleAuthorizationMiddleware("Admin"),
    deleteUser
  )
  .get(authenticationMiddleware, adminAndSelfAuthMiddleware, getOneUser)
  .patch(
    userEditProfileValidationMiddleware,
    authenticationMiddleware,
    roleAuthorizationMiddleware("Admin"),
    editUser
  );

router
  .route("/auth/delete-by-email")
  .delete(
    authenticationMiddleware,
    roleAuthorizationMiddleware("Admin"),
    deleteUserByEmail
  );

export default router;
