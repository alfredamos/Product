import { MakeAdminUserModel } from "../models/makeAdminUserModel";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { makeAdminUserValidation } from "../validations/makeAdminUserValidation";

export const makeAdminUserValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const makeAdminUserModel = req.body as MakeAdminUserModel;

  const { error, value } = makeAdminUserValidation(makeAdminUserModel);

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
