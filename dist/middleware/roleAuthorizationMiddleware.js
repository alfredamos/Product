"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleAuthorizationMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const roleAuthorizationMiddleware = (...roles) => {
    return (req, res, next) => {
        var _a;
        const role = (_a = req["userInfo"]) === null || _a === void 0 ? void 0 : _a.userType;
        const isRole = roles.includes(role);
        if (!isRole) {
            return next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized to view or modify this resource!"));
        }
        next();
    };
};
exports.roleAuthorizationMiddleware = roleAuthorizationMiddleware;
