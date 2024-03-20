import { Request, Response, NextFunction } from "express";
import { nasaService } from "../../services";
import { BaseController } from "../../common/base.controller";
import { validateRoverNameMiddleware } from "../../common/middleware/validation.middleware";

export class RoverPhotosController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      {
        path: "/api/photos/:rover",
        method: "get",
        func: this.getLastRoverPhoto,
        middlewares: [{ execute: validateRoverNameMiddleware }]
      }
    ]);
  }

  async getLastRoverPhoto(req: Request, res: Response, next: NextFunction) {
    try {
      const roverName = (req as any).metadata["roverName"];
      const { img_src } = await nasaService.getLastRoverPhoto(roverName);
      res.json({ img_src });
    } catch (error) {
      next(error);
    }
  }
}
