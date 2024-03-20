import path from "path";
import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../../common/base.controller";

export class UserController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      {
        path: "/user",
        method: "get",
        func: this.renderUserPage
      }
    ]);
  }

  async renderUserPage(req: Request, res: Response, next: NextFunction) {
    try {
      res.render(path.join(__dirname, "user.view.html"));
    } catch (error) {
      next(error);
    }
  }
}
