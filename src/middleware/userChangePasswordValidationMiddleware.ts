import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { userChangePasswordValidation } from "../validations/userChangePasswordValidation";
import { ChangePasswordModel } from "../models/changePasswordModel";

export const userChangePasswordValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const changePasswordModel = req.body as ChangePasswordModel;

  const { error, value } = userChangePasswordValidation(changePasswordModel);

  if (error) {
    const errorMessages = error.details.map((err) => err.message).join(". ");
    next(
      catchError(
        StatusCodes.BAD_REQUEST,
        `${errorMessages} - Please provide all values!`
      )
    );
    return;
  }
  next();

  return value;
};
