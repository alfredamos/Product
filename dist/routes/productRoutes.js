"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const idValidMiddleware_1 = require("../middleware/idValidMiddleware");
const authenticationMiddleware_1 = require("../middleware/authenticationMiddleware");
const productValidationMiddleware_1 = require("../middleware/productValidationMiddleware");
const roleAuthorizationMiddleware_1 = require("../middleware/roleAuthorizationMiddleware");
const router = express_1.default.Router();
router.param("id", idValidMiddleware_1.idValidMiddleware);
router
    .route("/")
    .get(authenticationMiddleware_1.authenticationMiddleware, productController_1.getAllProducts)
    .post(productValidationMiddleware_1.productValidationMiddleware, authenticationMiddleware_1.authenticationMiddleware, (0, roleAuthorizationMiddleware_1.roleAuthorizationMiddleware)("Admin"), productController_1.createProduct);
router
    .route("/:id")
    .delete(authenticationMiddleware_1.authenticationMiddleware, (0, roleAuthorizationMiddleware_1.roleAuthorizationMiddleware)("Admin"), productController_1.deleteProduct)
    .get(authenticationMiddleware_1.authenticationMiddleware, productController_1.getProductById)
    .patch(productValidationMiddleware_1.productValidationMiddleware, authenticationMiddleware_1.authenticationMiddleware, (0, roleAuthorizationMiddleware_1.roleAuthorizationMiddleware)("Admin"), productController_1.updatedProduct);
router
    .route("/users/:userId")
    .get(authenticationMiddleware_1.authenticationMiddleware, productController_1.getAllProductsByUserId);
exports.default = router;
