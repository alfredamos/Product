"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationByRoleMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const authorizationByRoleMiddleware = (...roles) => {
    console.log({ roles });
    return (req, res, next) => {
        if (!roles.includes(req["userInfo"].role)) {
            return next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized to view this resource!"));
        }
        next();
    };
};
exports.authorizationByRoleMiddleware = authorizationByRoleMiddleware;
function getRole(roles, role) {
    return roles.includes(role);
}
