import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { LoginModel } from "../models/loginModel";
import { userLoginValidation } from "../validations/userLoginValidation";
import { log } from "console";

export const userLoginValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginModel = req.body as LoginModel;

  const { error, value } = userLoginValidation(loginModel);

  if (error) {
    const errorMessages = error.details.map((err) => err.message).join(". ");
    next(
      catchError(
        StatusCodes.BAD_REQUEST,
        `${errorMessages} - please provide all values.`
      )
    );
    return;
  }
  next();
  return value;
};
