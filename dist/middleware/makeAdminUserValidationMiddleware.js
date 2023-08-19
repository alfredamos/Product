"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAdminUserValidationMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const makeAdminUserValidation_1 = require("../validations/makeAdminUserValidation");
const makeAdminUserValidationMiddleware = (req, res, next) => {
    const makeAdminUserModel = req.body;
    const { error, value } = (0, makeAdminUserValidation_1.makeAdminUserValidation)(makeAdminUserModel);
    if (error) {
        const errorMessages = error.details.map((err) => err.message).join(". ");
        next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `${errorMessages} - Please provide all values!`));
        return;
    }
    next();
    return value;
};
exports.makeAdminUserValidationMiddleware = makeAdminUserValidationMiddleware;
