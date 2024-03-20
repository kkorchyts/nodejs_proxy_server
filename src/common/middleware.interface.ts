import { Request, Response, NextFunction } from "express";
import { Exception } from "./exceptions/Exception";

export interface IMiddleware {
  execute:
    | ((req: Request, res: Response, next: NextFunction) => void)
    | ((
        err: Error | Exception,
        req: Request,
        res: Response,
        next: NextFunction
      ) => void);
}
