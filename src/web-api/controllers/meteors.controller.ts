import { Request, Response, NextFunction } from "express";
import { getPreviousPeriod } from "../utils/date-utils";
import { nasaService } from "../../services";
import { BaseController } from "../../common/base.controller";
import { validateMeteorsFilterApiMiddleware } from "../../common/middleware/validation.middleware";

export class MeteorsController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      {
        path: "/api/meteors",
        method: "get",
        func: this.getMeteors,
        middlewares: [{ execute: validateMeteorsFilterApiMiddleware }]
      }
    ]);
  }

  async getMeteors(req: Request, res: Response, next: NextFunction) {
    try {
      const { date, countOnly, dangerousOnly } = (req as any).metadata[
        "meteorsFilter"
      ];
      const period = getPreviousPeriod(date);
      const response = await nasaService.getAsteroidsByPeriod(
        period,
        countOnly,
        dangerousOnly
      );
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
