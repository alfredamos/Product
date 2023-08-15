"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const client_1 = require("@prisma/client");
const authorizationMiddleware = (req, res, next) => {
    const userInfo = req["userInfo"];
    if (!userInfo) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }
    const isAdmin = (userInfo === null || userInfo === void 0 ? void 0 : userInfo.userType) === client_1.UserType.Admin;
    if (!isAdmin) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized to view or modify this resource.");
    }
    next();
};
exports.authorizationMiddleware = authorizationMiddleware;
