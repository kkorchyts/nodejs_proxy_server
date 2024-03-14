import dotenv from "dotenv";

dotenv.config();

export const config = {
  nasaApiConfig: {
    key: process.env.NASA_API_KEY || "",
    baseUrl: process.env.NASA_API_API_BASE_URL || "",
    asteroidsUrl: process.env.NASA_API_ASTEROIDS_URL || "",
    roverPhotosUrl: process.env.NASA_API_PHOTOS_ROVER_URL || "",
    photosRoverManifestUrl: process.env.NASA_API_PHOTOS_MANIFEST_URL || "",
  },
  appServerConfig: {
    port: process.env.PORT,
  },
};
