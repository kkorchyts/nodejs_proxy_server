import { NextFunction, Request, Response } from "express";
import { Exception } from "../../common/exceptions/Exception";

export class PageNotFoundApiMiddleware {
  catch(req: Request, res: Response): void {
    res.status(404).json({
      message: "Page not found"
    });
  }
}
