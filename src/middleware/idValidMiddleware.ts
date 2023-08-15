import { UuidTool } from "uuid-tool";
import { Request, Response, NextFunction } from "express";
import catchError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

export const idValidMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const isCorrectId = UuidTool.isUuid(id);

  if(!isCorrectId){
      throw catchError(StatusCodes.BAD_REQUEST, `Invalid id : ${id}`);      
  }
  next(); 
};
