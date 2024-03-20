import { Request, Response } from "express";

export class PageNotFoundApiMiddleware {
  catch(req: Request, res: Response): void {
    res.status(404).json({
      message: "Page not found"
    });
  }
}
