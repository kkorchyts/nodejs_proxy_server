import { NextFunction, Request, Response } from "express";
import { Exception } from "../../common/exceptions/Exception";

export class ExceptionFilterApiMiddleware {
  catch(
    err: Error | Exception,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const statusCode = (err as any).statusCode || 500;
    res.status(statusCode).json({
      error: {
        code: statusCode,
        message: err.message
      }
    });
  }
}
