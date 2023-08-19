import {Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import FeatureProductModel from "../models/featureProductModel";
import { featureProductValidation } from "../validations/featureProductValidation";

export const featureProductValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productModel = req.body as FeatureProductModel;

  const { error, value } = featureProductValidation(productModel);

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
