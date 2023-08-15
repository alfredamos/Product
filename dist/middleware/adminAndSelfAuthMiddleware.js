"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAndSelfAuthMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const client_1 = require("@prisma/client");
const adminAndSelfAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req["userInfo"];
    const { id: idFromParams } = req === null || req === void 0 ? void 0 : req.params;
    const idFromToken = userInfo === null || userInfo === void 0 ? void 0 : userInfo.id;
    if (!userInfo) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }
    if (idFromParams && idFromParams === idFromToken) {
        next();
        return;
    }
    const isAdmin = (userInfo === null || userInfo === void 0 ? void 0 : userInfo.userType) === client_1.UserType.Admin;
    if (isAdmin) {
        next();
        return;
    }
    next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized to view or modify this resource."));
});
exports.adminAndSelfAuthMiddleware = adminAndSelfAuthMiddleware;
