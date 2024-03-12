import express from "express"
import {nasaAsteroidsHandler} from "./handler/nasa-asteroids.handler.js";
import {checkQueryParamMiddleware} from "./middleware/nasa-asteroids.middleware.js";
import {errorMiddleware} from "./middleware/error.middleware.js";

export const app = express();
app.get('/meteors', checkQueryParamMiddleware, nasaAsteroidsHandler)
app.use(errorMiddleware);
