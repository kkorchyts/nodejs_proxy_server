import path from "path";
import { Request, Response, NextFunction } from "express";
import { getMeteorsDataByPeriod } from "./meteors.model";
import { BaseController } from "../../../common/base.controller";
import { validateMeteorsFilterUiMiddleware } from "../../../common/middleware/validation.middleware";

export class MeteorsController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      {
        path: "/meteors",
        method: "get",
        func: this.renderMeteorsFormPage,
        middlewares: [{ execute: validateMeteorsFilterUiMiddleware }]
      }
    ]);
  }

  async renderMeteorsFormPage(req: Request, res: Response, next: NextFunction) {
    try {
      let meteors;
      const meteorsFilter = (req as any).metadata["meteorsFilter"];
      if (meteorsFilter.date) {
        meteors = await getMeteorsDataByPeriod(meteorsFilter);
      }
      res.render(path.join(__dirname, "meteors-form.view.html"), {
        asteroids: meteors || {},
        meteorsFilter
      });
    } catch (error) {
      next(error);
    }
  }
}
