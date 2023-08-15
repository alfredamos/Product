"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValidMiddleware = void 0;
const uuid_tool_1 = require("uuid-tool");
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const idValidMiddleware = (req, res, next) => {
    const { id } = req.params;
    const isCorrectId = uuid_tool_1.UuidTool.isUuid(id);
    if (!isCorrectId) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `Invalid id : ${id}`);
    }
    next();
};
exports.idValidMiddleware = idValidMiddleware;
