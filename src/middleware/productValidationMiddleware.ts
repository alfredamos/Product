import { Request, Response, NextFunction } from "express";
import { productValidation } from "../validations/productValidation";
import { ProductModel } from "../models/productModel";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";

export const productValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productModel = req.body as ProductModel;

  const { error, value } = productValidation(productModel);

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
