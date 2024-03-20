import path from "path";
import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../../common/base.controller";

export class MainController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      {
        path: "/",
        method: "get",
        func: this.renderMainPage
      }
    ]);
  }

  async renderMainPage(req: Request, res: Response, next: NextFunction) {
    try {
      res.render(path.join(__dirname, "main.view.html"));
    } catch (error) {
      next(error);
    }
  }
}
