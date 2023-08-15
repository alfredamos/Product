"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationMiddleware = void 0;
const productValidation_1 = require("../validations/productValidation");
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const productValidationMiddleware = (req, res, next) => {
    const productModel = req.body;
    const { error, value } = (0, productValidation_1.productValidation)(productModel);
    if (error) {
        const errorMessages = error.details.map((err) => err.message).join(". ");
        next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `${errorMessages} - please provide all values.`));
        return;
    }
    next();
    return value;
};
exports.productValidationMiddleware = productValidationMiddleware;
