import path from "path";
import { NextFunction, Request, Response } from "express";
import { Exception } from "../../common/exceptions/Exception";

export class PageNotFoundUiMiddleware {
  catch(req: Request, res: Response): void {
    res
      .status(404)
      .render(path.resolve(__dirname, "../views", "page-not-found.html"));
  }
}
