import { EditProfileModel } from "../models/editProfileModel";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { userEditProfileValidation } from "../validations/userEditProfileValidation";

export const userEditProfileValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const editProfileModel = req.body as EditProfileModel;

  const { error, value } = userEditProfileValidation(editProfileModel);

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
