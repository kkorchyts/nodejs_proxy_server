import path from "path";
import { NextFunction, Request, Response } from "express";
import { Exception } from "../../common/exceptions/Exception";

export class ExceptionFilterUiMiddleware {
  catch(
    err: Error | Exception,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const statusCode = (err as any).statusCode || 500;
    res
      .status(statusCode)
      .render(path.resolve(__dirname, "../views", "server-error.html"), {
        error: {
          code: statusCode,
          message: err.message
        }
      });
  }
}
