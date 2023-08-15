"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authenticationMiddleware_1 = require("../middleware/authenticationMiddleware");
const roleAuthorizationMiddleware_1 = require("../middleware/roleAuthorizationMiddleware");
const userSignupValidationMiddleware_1 = require("../middleware/userSignupValidationMiddleware");
const adminAndSelfAuthMiddleware_1 = require("../middleware/adminAndSelfAuthMiddleware");
const userEditProfileValidationMiddleware_1 = require("../middleware/userEditProfileValidationMiddleware");
const router = express_1.default.Router();
router
    .route("/")
    .get(authenticationMiddleware_1.authenticationMiddleware, (0, roleAuthorizationMiddleware_1.roleAuthorizationMiddleware)("Admin"), authController_1.getAllUsers)
    .post(userSignupValidationMiddleware_1.userSignupValidationMiddleware, authenticationMiddleware_1.authenticationMiddleware, (0, roleAuthorizationMiddleware_1.roleAuthorizationMiddleware)("Admin"), authController_1.signup);
router
    .route("/users-by-email")
    .delete(authenticationMiddleware_1.authenticationMiddleware, (0, roleAuthorizationMiddleware_1.roleAuthorizationMiddleware)("Admin"), authController_1.deleteUserByEmail);
router
    .route("/:id")
    .delete(authenticationMiddleware_1.authenticationMiddleware, (0, roleAuthorizationMiddleware_1.roleAuthorizationMiddleware)("Admin"), authController_1.deleteUser)
    .get(authenticationMiddleware_1.authenticationMiddleware, adminAndSelfAuthMiddleware_1.adminAndSelfAuthMiddleware, authController_1.getOneUser)
    .patch(userEditProfileValidationMiddleware_1.userEditProfileValidationMiddleware, authenticationMiddleware_1.authenticationMiddleware, (0, roleAuthorizationMiddleware_1.roleAuthorizationMiddleware)("Admin"), authController_1.updateProfile);
router
    .route("/auth/delete-by-email")
    .delete(authenticationMiddleware_1.authenticationMiddleware, (0, roleAuthorizationMiddleware_1.roleAuthorizationMiddleware)("Admin"), authController_1.deleteUserByEmail);
exports.default = router;
