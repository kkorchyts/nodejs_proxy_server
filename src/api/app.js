import express from "express";
import * as Sentry from "@sentry/node";
import { handler as nasaAsteroidsHandler } from "./handler/nasa-asteroids.handler.js";
import { handler as nasaPhotosHandler } from "./handler/nasa-photos.handler.js";
import { handler as userDataHandler } from "./handler/user-data.handler.js";
import {
  validateDateMiddleware,
  validateRoverNameMiddleware,
  validateUserDataMiddleware,
} from "./middleware/validation.middleware.js";
import { exceptionFilterMiddleware } from "./middleware/exception-filter.middleware.js";
import { nunjucksConfig, sentryConfig } from "../config/config.js";
import nunjucks from "nunjucks";

export const app = express();
Sentry.init(sentryConfig(app));

nunjucks.configure( 'src/views', nunjucksConfig(app));

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.get("/", (req, res) => res.render('index.html'));

app.get("/user", (req, res) => res.render('user/index.html'))

app.get("/meteorsform", (req, res) => res.render('meteors/index.html'));
app.get("/meteors", validateDateMiddleware, nasaAsteroidsHandler);
app.get("/photos", (req, res) => res.render('rover-photos/index.html'));
app.get("/photos/:rover", validateRoverNameMiddleware, nasaPhotosHandler);

app.post("/user", validateUserDataMiddleware, userDataHandler);

app.use(Sentry.Handlers.errorHandler());
app.use(exceptionFilterMiddleware);

app.use("*", (req, res) => res.status(404).render('page-not-found.html'));
