import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";

export const errorHandlerMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const message = err.message || "Something went wrong.";
  const name = err.name || "Internal Server Error";
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  
  return res.status(statusCode).json({
    status: "fail",
    message,
    name,
  });
};
