import axios from "axios";
import { config } from "../../config/config.js";

export const buildGetAsteroidsRequest = ({ from, to }) => {
  return {
    baseURL: config.nasaApiConfig.baseUrl,
    url: config.nasaApiConfig.asteroidsUrl,
    validateStatus: () => true,
    params: {
      start_date: from,
      end_date: to,
      api_key: config.nasaApiConfig.key,
    },
  };
};

export const buildGetManifestRequest = (roverName) => {
  return {
    baseURL: config.nasaApiConfig.baseUrl,
    url: `${config.nasaApiConfig.photosRoverManifestUrl}${roverName}`,
    validateStatus: () => true,
    params: {
      api_key: config.nasaApiConfig.key,
    },
  };
};

export const buildGetPhotosRequest = ({ roverName, earthDate }) => {
  return {
    baseURL: config.nasaApiConfig.baseUrl,
    url: `${config.nasaApiConfig.roverPhotosUrl}${roverName}/photos`,
    validateStatus: () => true,
    params: {
      earth_date: earthDate,
      api_key: config.nasaApiConfig.key,
    },
  };
};

export const axiosNasaClient = async (requestBuilder, schema) => {
  const response = await axios.request(requestBuilder);
  const value = await schema.validateAsync(response, {
    abortEarly: false,
    stripUnknown: true,
  });
  return value.data;
};
