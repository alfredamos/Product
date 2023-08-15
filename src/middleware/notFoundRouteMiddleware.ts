import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

export const notFoundRouteMiddleware = (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: `Route does not exist on ${req.url}.`,
  });
};
