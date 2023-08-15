import { UuidTool } from "uuid-tool";
import { Request, Response, NextFunction } from "express";
import catchError from "http-errors";
import { StatusCodes } from "http-status-codes";

export const idEqualityMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { idFromParams } = req.params;
  const {idFromBody} = req.body
  const isEqual = UuidTool.compare(idFromBody, idFromParams);

  if (!isEqual) {
    throw catchError(StatusCodes.BAD_REQUEST, `Mismatch id - from params : ${idFromParams} is not equal to id - from body : ${idFromBody}`);
  }
  next();
};
