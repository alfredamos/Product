import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { SignupModel } from "../models/signupModel";
import { userSignupValidation } from "../validations/userSignupValidation";
import { log } from "console";

export const userSignupValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signupModel = req.body as SignupModel;

  const { error, value } = userSignupValidation(signupModel);
  
  if (error) {
    const errorMessages = error.details.map((err) => err.message).join(". ");

    next(
      catchError(
        StatusCodes.BAD_REQUEST,
        `${errorMessages} - Please provide all values!`
      )
    );
  }
  next();
  return value;
};
