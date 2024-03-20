import { Router, Response } from "express";
import { IController } from "./controller.interface";

export abstract class BaseController {
  private readonly _router: Router;

  protected constructor() {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message?: T): Response {
    if (message) {
      res.type("application/json");
      return res.status(code).json(message);
    }
    return res.status(code).send();
  }

  public ok<T>(res: Response, message?: T): Response {
    return this.send<T>(res, 200, message);
  }

  public created(res: Response): Response {
    return res.status(201);
  }

  protected bindRoutes(routes: Array<IController>): void {
    routes.forEach(({ path, func, method, middlewares }) => {
      const middleware = middlewares?.map((m) => m.execute.bind(m));
      const handler = func.bind(this);
      const pipeline = middleware ? [...middleware, handler] : handler;
      this._router[method](path, pipeline);
    });
  }
}
