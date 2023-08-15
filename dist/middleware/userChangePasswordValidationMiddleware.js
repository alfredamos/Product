"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userChangePasswordValidationMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const userChangePasswordValidation_1 = require("../validations/userChangePasswordValidation");
const userChangePasswordValidationMiddleware = (req, res, next) => {
    const changePasswordModel = req.body;
    const { error, value } = (0, userChangePasswordValidation_1.userChangePasswordValidation)(changePasswordModel);
    if (error) {
        const errorMessages = error.details.map((err) => err.message).join(". ");
        next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `${errorMessages} - Please provide all values!`));
        return;
    }
    next();
    return value;
};
exports.userChangePasswordValidationMiddleware = userChangePasswordValidationMiddleware;
