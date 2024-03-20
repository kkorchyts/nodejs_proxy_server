import { getLastPhotoByRoverName } from "./rover-photos.model";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../../common/base.controller";
import { validateRoverNameMiddleware } from "../../../common/middleware/validation.middleware";

export class RoverPhotosController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      {
        path: "/photos",
        method: "get",
        func: this.renderRoverNameFormPage
      },
      {
        path: "/photos/:rover",
        method: "get",
        func: this.renderRoverPhotoPage,
        middlewares: [{ execute: validateRoverNameMiddleware }]
      }
    ]);
  }

  async renderRoverNameFormPage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.render(path.join(__dirname, "rover-name-form.view.html"));
    } catch (error) {
      next(error);
    }
  }

  async renderRoverPhotoPage(req: Request, res: Response, next: NextFunction) {
    try {
      const roverName = (req as any).metadata.roverName;
      const { img_src } = await getLastPhotoByRoverName(roverName);
      res.render(path.join(__dirname, "rover-photo.view.html"), {
        roverName,
        img_src
      });
    } catch (error) {
      next(error);
    }
  }
}
