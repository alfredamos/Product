"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignupValidationMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const userSignupValidation_1 = require("../validations/userSignupValidation");
const userSignupValidationMiddleware = (req, res, next) => {
    const signupModel = req.body;
    const { error, value } = (0, userSignupValidation_1.userSignupValidation)(signupModel);
    if (error) {
        const errorMessages = error.details.map((err) => err.message).join(". ");
        next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `${errorMessages} - Please provide all values!`));
    }
    next();
    return value;
};
exports.userSignupValidationMiddleware = userSignupValidationMiddleware;
