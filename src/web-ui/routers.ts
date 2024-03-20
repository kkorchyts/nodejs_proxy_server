import express from "express";
import { MeteorsController } from "./pages/meteors/meteors.controller";
import { MainController } from "./pages/main/main.controller";
import { UserController } from "./pages/user/user.controller";
import { RoverPhotosController } from "./pages/rover/rover-photos.controller";

export const router = express.Router();
router.use(new MainController().router);
router.use(new UserController().router);
router.use(new MeteorsController().router);
router.use(new RoverPhotosController().router);
