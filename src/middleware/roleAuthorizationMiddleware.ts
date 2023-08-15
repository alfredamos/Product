import { Request, Response, NextFunction } from "express";
import catchError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { UserInfo } from "../models/userInfoModel";

export const roleAuthorizationMiddleware = (...roles) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (req["userInfo"] as UserInfo)?.userType;
    const isRole = roles.includes(role);

    if (!isRole) {
      return next(
        catchError(
          StatusCodes.FORBIDDEN,
          "You are not authorized to view or modify this resource!"
        )
      );
    }
    next();
  };
};

