"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationMiddleware_1 = require("../middleware/authenticationMiddleware");
const authController_1 = require("../controllers/authController");
const userChangePasswordValidationMiddleware_1 = require("../middleware/userChangePasswordValidationMiddleware");
const userLoginValidationMiddleware_1 = require("../middleware/userLoginValidationMiddleware");
const userSignupValidationMiddleware_1 = require("../middleware/userSignupValidationMiddleware");
const userEditProfileValidationMiddleware_1 = require("../middleware/userEditProfileValidationMiddleware");
const adminAndSelfAuthMiddleware_1 = require("../middleware/adminAndSelfAuthMiddleware");
const idValidMiddleware_1 = require("../middleware/idValidMiddleware");
const roleAuthorizationMiddleware_1 = require("../middleware/roleAuthorizationMiddleware");
const makeAdminUserValidationMiddleware_1 = require("../middleware/makeAdminUserValidationMiddleware");
const router = express_1.default.Router();
router.param("id", idValidMiddleware_1.idValidMiddleware);
router
    .route("/change-password")
    .patch(userChangePasswordValidationMiddleware_1.userChangePasswordValidationMiddleware, authenticationMiddleware_1.authenticationMiddleware, authController_1.changePassword);
router.route("/current-user").get(authenticationMiddleware_1.authenticationMiddleware, authController_1.currentUser);
router.route("/login").post(userLoginValidationMiddleware_1.userLoginValidationMiddleware, authController_1.login);
router
    .route("/change-role")
    .patch(makeAdminUserValidationMiddleware_1.makeAdminUserValidationMiddleware, authenticationMiddleware_1.authenticationMiddleware, (0, roleAuthorizationMiddleware_1.roleAuthorizationMiddleware)("Admin"), authController_1.updateUserRole);
router.route("/signup").post(userSignupValidationMiddleware_1.userSignupValidationMiddleware, authController_1.signup);
router
    .route("/users")
    .get(authenticationMiddleware_1.authenticationMiddleware, (0, roleAuthorizationMiddleware_1.roleAuthorizationMiddleware)("Admin"), authController_1.getAllUsers);
router
    .route("/edit-profile")
    .patch(userEditProfileValidationMiddleware_1.userEditProfileValidationMiddleware, authenticationMiddleware_1.authenticationMiddleware, authController_1.updateProfile);
router
    .route("/users/:id")
    .delete(authenticationMiddleware_1.authenticationMiddleware, (0, roleAuthorizationMiddleware_1.roleAuthorizationMiddleware)("Admin"), authController_1.deleteUser)
    .get(authenticationMiddleware_1.authenticationMiddleware, adminAndSelfAuthMiddleware_1.adminAndSelfAuthMiddleware, authController_1.getOneUser);
exports.default = router;
