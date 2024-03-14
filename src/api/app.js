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
import { ProfilingIntegration } from "@sentry/profiling-node";
import { config } from "../config/config.js";

export const app = express();
Sentry.init({
  dsn: config.sentryConfig.dns,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.get("/meteors", validateDateMiddleware, nasaAsteroidsHandler);
app.get("/photos/:rover", validateRoverNameMiddleware, nasaPhotosHandler);
app.post("/user", validateUserDataMiddleware, userDataHandler);

app.use(Sentry.Handlers.errorHandler());
app.use(exceptionFilterMiddleware);

app.use("*", (req, res) => res.status(404).json({ message: "Page not found" }));
