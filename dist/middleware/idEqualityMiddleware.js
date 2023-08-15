"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idEqualityMiddleware = void 0;
const uuid_tool_1 = require("uuid-tool");
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const idEqualityMiddleware = (req, res, next) => {
    const { idFromParams } = req.params;
    const { idFromBody } = req.body;
    const isEqual = uuid_tool_1.UuidTool.compare(idFromBody, idFromParams);
    if (!isEqual) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `Mismatch id - from params : ${idFromParams} is not equal to id - from body : ${idFromBody}`);
    }
    next();
};
exports.idEqualityMiddleware = idEqualityMiddleware;
