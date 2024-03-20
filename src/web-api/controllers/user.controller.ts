import { userService } from "../../services";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../common/base.controller";
import { validateUserDataMiddleware } from "../../common/middleware/validation.middleware";

export class UserController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      {
        path: "/api/user",
        method: "post",
        func: this.postUser,
        middlewares: [{ execute: validateUserDataMiddleware }]
      }
    ]);
  }

  async postUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = (req as any).metadata["bodyUserData"];
      const response = userService.postUserData(userData);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
