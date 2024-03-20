import path from "path";
import { Request, Response } from "express";

export class PageNotFoundUiMiddleware {
  catch(req: Request, res: Response): void {
    res
      .status(404)
      .render(path.resolve(__dirname, "../views", "page-not-found.html"));
  }
}
