import {
  buildGetAsteroidsRequest,
  axiosNasaClient,
  buildGetManifestRequest,
  buildGetPhotosRequest,
} from "./nasa/axios-nasa.client.js";
import { nasaManifestResponseSchema } from "../common/schemas/nasa-manifest-response.schema.js";
import { nasaRoverPhotosResponseSchema } from "../common/schemas/nasa-rever-photos-response.schema.js";
import { nasaAsteroidsResponseSchema } from "../common/schemas/nasa-asteroids-response.schema.js";

export const nasaGetAsteroidsClient = (param) =>
  axiosNasaClient(buildGetAsteroidsRequest(param), nasaAsteroidsResponseSchema);
export const nasaGetPhotosManifestClient = (param) =>
  axiosNasaClient(buildGetManifestRequest(param), nasaManifestResponseSchema);
export const nasaGetPhotosClient = (param) =>
  axiosNasaClient(buildGetPhotosRequest(param), nasaRoverPhotosResponseSchema);
