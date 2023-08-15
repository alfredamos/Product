import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import catchError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { UserInfo } from "../models/userInfoModel";
import { expression, options } from "joi";


export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtTokenHeader = req?.headers?.authorization;
  
  if (!jwtTokenHeader?.startsWith("Bearer ")) {
    next(catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials"));
    return;
  }

  const authJwtToken = jwtTokenHeader?.split(" ").at(1);

  if (!authJwtToken) {
    next(catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials"));
    return;
  }

  verifyAuthJwtToken(authJwtToken)
    .then((userInfo) => {
      req["userInfo"] = userInfo as UserInfo;
      next();
      return;
    })
    .catch((err) => {
      next(
        catchError(
          StatusCodes.UNAUTHORIZED,
          `${err.message} - Invalid credentials.`
        )
      );
      return;
    });
};

async function verifyAuthJwtToken(authJwtToken: string) {
  return await jwt.verify(authJwtToken, process.env.JWT_SECRET_KEY!);
}
