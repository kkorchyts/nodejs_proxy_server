import express from "express";
import { MeteorsController } from "./controllers/meteors.controller";
import { RoverPhotosController } from "./controllers/rover-photos.controller";
import { ExceptionFilterApiMiddleware } from "./middleware/exception-filter.middleware";
import { UserController } from "./controllers/user.controller";

export const router = express.Router();
router.use(new MeteorsController().router);
router.use(new RoverPhotosController().router);
router.use(new UserController().router);
