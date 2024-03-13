import express from "express"
import {handler as nasaAsteroidsHandler} from "./handler/nasa-asteroids.handler.js";
import {handler as nasaPhotosHandler} from "./handler/nasa-photos.handler.js";
import {handler as userDataHandler} from "./handler/user-data.handler.js";
import {
    validateDateMiddleware,
    validateRoverNameMiddleware,
    validateUserDataMiddleware,
} from "./middleware/validation.middleware.js";
import {exceptionFilterMiddleware} from "./middleware/exception-filter.middleware.js";

export const app = express();
app.use(express.json());
app.get('/meteors', validateDateMiddleware, nasaAsteroidsHandler)
app.get('/photos/:rover', validateRoverNameMiddleware, nasaPhotosHandler)
app.post('/user', validateUserDataMiddleware, userDataHandler)

app.use(exceptionFilterMiddleware);
