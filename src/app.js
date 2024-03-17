import express from "express";
import * as Sentry from "@sentry/node";

import { exceptionFilterApiMiddleware } from "./web-api/middleware/exception-filter.middleware.js";
import { nunjucksConfig, sentryConfig } from "./config/config.js";
import nunjucks from "nunjucks";
import {router as uiRouter} from "./web-ui/routers.js";
import {router as apiRouter} from "./web-api/routers.js";
import {pageNotFoundMiddleware as pageNotFoundApiMiddleware} from "./web-api/middleware/page-not-found.middleware.js";
import {pageNotFoundMiddleware as pageNotFoundUiMiddleware} from "./web-ui/middleware/page-not-found.middleware.js";
import {exceptionFilterUiMiddleware} from "./web-ui/middleware/exception-filter.middleware.js";

export const app = express();
Sentry.init(sentryConfig(app));

nunjucks.configure(nunjucksConfig(app));

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(apiRouter);
app.use(uiRouter)

app.use(Sentry.Handlers.errorHandler());

app.use("/api/*", exceptionFilterApiMiddleware);
app.use("*", exceptionFilterUiMiddleware);

app.use("api/*", pageNotFoundApiMiddleware);
app.use("*", pageNotFoundUiMiddleware);
