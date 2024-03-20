import dotenv from "dotenv";
import { Express } from "express";
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";

dotenv.config();

export const config = {
  nasaApiConfig: {
    key: process.env.NASA_API_KEY || "",
    baseUrl: process.env.NASA_API_API_BASE_URL || "",
    asteroidsUrl: process.env.NASA_API_ASTEROIDS_URL || "",
    roverPhotosUrl: process.env.NASA_API_PHOTOS_ROVER_URL || "",
    photosRoverManifestUrl: process.env.NASA_API_PHOTOS_MANIFEST_URL || ""
  },
  sentryConfig: {
    dns: process.env.SENTRY_DNS || ""
  },
  appServerConfig: {
    port: process.env.PORT
  }
};

export const sentryConfig = (app: Express) => {
  return {
    dsn: config.sentryConfig.dns,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration()
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0
  };
};

export const nunjucksConfig = (app: Express) => {
  return {
    autoescape: true,
    express: app
  };
};
