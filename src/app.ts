import express, { Express } from "express";
import * as Sentry from "@sentry/node";

import { nunjucksConfig, sentryConfig } from "./config/config";
import nunjucks from "nunjucks";
import { router as uiRouter } from "./web-ui/routers";
import { router as apiRouter } from "./web-api/routers";
import { PageNotFoundApiMiddleware } from "./web-api/middleware/page-not-found.middleware";
import { PageNotFoundUiMiddleware } from "./web-ui/middleware/page-not-found.middleware";
import { ExceptionFilterUiMiddleware } from "./web-ui/middleware/exception-filter.middleware";
import { ExceptionFilterApiMiddleware } from "./web-api/middleware/exception-filter.middleware";

export const app: Express = express();
Sentry.init(sentryConfig(app));

nunjucks.configure(nunjucksConfig(app));

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(apiRouter);
app.use(uiRouter);

app.use(Sentry.Handlers.errorHandler());

const exceptionFilterApiMiddleware = new ExceptionFilterApiMiddleware();
app.use(
  "/api/*",
  exceptionFilterApiMiddleware.catch.bind(exceptionFilterApiMiddleware)
);

const exceptionFilterUiMiddleware = new ExceptionFilterUiMiddleware();
app.use(exceptionFilterUiMiddleware.catch.bind(exceptionFilterUiMiddleware));

const pageNotFoundApiMiddleware = new PageNotFoundApiMiddleware();
app.use(
  "/api/*",
  pageNotFoundApiMiddleware.catch.bind(pageNotFoundApiMiddleware)
);

const pageNotFoundUiMiddleware = new PageNotFoundUiMiddleware();
app.use("*", pageNotFoundUiMiddleware.catch.bind(pageNotFoundUiMiddleware));
