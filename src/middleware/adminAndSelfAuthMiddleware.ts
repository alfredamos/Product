import { Request, Response, NextFunction } from "express";
import catchError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { UserType } from "@prisma/client";
import { UserInfo } from "../models/userInfoModel";

export const adminAndSelfAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userInfo = req["userInfo"] as UserInfo;
  const { id: idFromParams } = req?.params;
  const idFromToken = userInfo?.id;

  if (!userInfo) {
    throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  if (idFromParams && idFromParams === idFromToken) {
    next();
    return;
  }

  const isAdmin = userInfo?.userType === UserType.Admin;

  if (isAdmin) {
    next();
    return;
  }

  next(
    catchError(
      StatusCodes.FORBIDDEN,
      "You are not authorized to view or modify this resource."
    )
  );
};
