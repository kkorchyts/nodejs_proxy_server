import axios, {HttpStatusCode} from "axios";
import {config} from "../../config/config.js";
import {Exception} from "../../api/exceptions/Exception.js";

export const buildGetAsteroidsRequest = ({from, to}) => {
    return {
        baseURL: config.nasaApiConfig.baseUrl,
        url: config.nasaApiConfig.asteroidsUrl,
        validateStatus: () => true,
        params: {
            start_date: from,
            end_date: to,
            api_key: config.nasaApiConfig.key
        }
    }
}

export const buildGetManifestRequest = (roverName) => {
    return {
        baseURL: config.nasaApiConfig.baseUrl,
        url: `${config.nasaApiConfig.photosRoverManifestUrl}${roverName}`,
        validateStatus: () => true,
        params: {
            api_key: config.nasaApiConfig.key
        }
    }
}

export const buildGetPhotosRequest = ({roverName, earthDate}) => {
    return {
        baseURL: config.nasaApiConfig.baseUrl,
        url: `${config.nasaApiConfig.roverPhotosUrl}${roverName}/photos`,
        validateStatus: () => true,
        params: {
            earth_date: earthDate,
            api_key: config.nasaApiConfig.key
        }
    }
}

const validateNasaResponse = (status) => {
    if (status !== HttpStatusCode.Ok) {
        throw new Exception(status, `NASA API response is ${status}`);
    }
}

export class AxiosNasaClient {
    async getAsteroidsCountByPeriod(period) {
        const request = buildGetAsteroidsRequest(period);
        const {status, data} = await axios.request(request);
        validateNasaResponse(status);
        return data;
    }

    async getRoverManifest(roverName) {
        const request = buildGetManifestRequest(roverName);
        const {status, data} = await axios.request(request);
        validateNasaResponse(status);
        return data;
    }
}

export const axiosNasaClient = async (requestBuilder) => {
    const {status, data} = await axios.request(requestBuilder);
    validateNasaResponse(status);
    return data;
}
