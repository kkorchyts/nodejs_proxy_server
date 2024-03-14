import express from "express"
import {handler as nasaAsteroidsHandler} from "./handler/nasa-asteroids.handler.js";
import {handler as nasaPhotosHandler} from "./handler/nasa-photos.handler.js";
import {handler as userDataHandler} from "./handler/user-data.handler.js";


import {checkQueryParamMiddleware} from "./middleware/nasa-asteroids.middleware.js";
import {exceptionFilterMiddleware} from "./middleware/exception-filter.middleware.js";
import {checkUserDataMiddleware} from "./middleware/user-data.middleware.js";

export const app = express();
app.use(express.json());
app.get('/meteors', checkQueryParamMiddleware, nasaAsteroidsHandler)
app.get('/photos/:rover', nasaPhotosHandler)
app.post('/user', checkUserDataMiddleware, userDataHandler)

app.use(exceptionFilterMiddleware);
