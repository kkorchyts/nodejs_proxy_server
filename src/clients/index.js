import {
    buildGetAsteroidsRequest,
    axiosNasaClient,
    buildGetManifestRequest,
    buildGetPhotosRequest
} from "./nasa/axios-nasa.client.js";

export const nasaGetAsteroidsClient = (param) => axiosNasaClient(buildGetAsteroidsRequest(param));
export const nasaGetPhotosManifestClient = (param) => axiosNasaClient(buildGetManifestRequest(param));
export const nasaGetPhotosClient = (param) => axiosNasaClient(buildGetPhotosRequest(param));


