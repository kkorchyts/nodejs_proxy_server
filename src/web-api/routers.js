import express from "express";
import {handler as nasaAsteroidsHandler} from "./handler/nasa-asteroids.handler.js";
import {
    validateMeteorsFilterApiMiddleware,
    validateRoverNameMiddleware,
    validateUserDataMiddleware
} from "../common/middleware/validation.middleware.js";
import {handler as userDataHandler} from "./handler/user-data.handler.js";
import {handler as nasaPhotosHandler} from "./handler/nasa-photos.handler.js";
import {exceptionFilterApiMiddleware} from "./middleware/exception-filter.middleware.js";

export const router = express.Router();

router.get("/api/meteors", validateMeteorsFilterApiMiddleware, nasaAsteroidsHandler);
router.use("/api/photos/:rover", validateRoverNameMiddleware, nasaPhotosHandler);

router.post("/api/user", validateUserDataMiddleware, userDataHandler);

router.use("/api/*", exceptionFilterApiMiddleware);
