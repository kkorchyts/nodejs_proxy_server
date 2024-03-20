import { NextFunction, Request, Response, Router } from "express";
import { IMiddleware } from "./middleware.interface";

export interface IController {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, "get" | "post" | "delete" | "patch" | "put">;
  middlewares?: Array<IMiddleware>;
}
