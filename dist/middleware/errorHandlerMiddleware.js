"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    const message = err.message || "Something went wrong.";
    const name = err.name || "Internal Server Error";
    const statusCode = err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    return res.status(statusCode).json({
        status: "fail",
        message,
        name,
    });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
