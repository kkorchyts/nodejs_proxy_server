import { config } from "../../../config/config";
import { Period } from "../../../web-api/utils/date-utils";
import axios, { AxiosRequestConfig } from "axios";
import Joi from "joi";
import { NasaClientInterface, RoverPhotoParams } from "../nasa.client.interface";
import { nasaAsteroidsSchema } from "../schemas/nasa-asteroids.schema";
import { nasaManifestSchema } from "../schemas/nasa-manifest.schema";
import { NasaManifest } from "../dto/nasa-manifest";
import { NasaAsteroids } from "../dto/nasa-asteroids";
import { NasaRoverPhotos } from "../dto/nasa-rover-photos";
import { nasaRoverPhotosSchema } from "../schemas/nasa-rover-photos.schema";
import { format } from "date-fns";

export class AxiosNasaClientImpl implements NasaClientInterface {
  getAsteroid(period: Period): NasaAsteroids {
    return this.sendRequest(this.buildGetAsteroidsRequest(period), nasaAsteroidsSchema);
  }

  getPhotosManifest(roverName: string): NasaManifest {
    return this.sendRequest(this.buildGetManifestRequest(roverName), nasaManifestSchema);
  }

  getRoverPhotos(params: RoverPhotoParams): NasaRoverPhotos {
    return this.sendRequest(this.buildGetPhotosRequest(params), nasaRoverPhotosSchema);
  }

  private async sendRequest(request: AxiosRequestConfig, schema: Joi.AnySchema): Promise<any> {
    const response = await axios.request(request);
    return await schema.validateAsync(response.data, {
      abortEarly: false,
      stripUnknown: true
    });
  }

  private buildGetAsteroidsRequest({ from, to }: Period): AxiosRequestConfig {
    return {
      baseURL: config.nasaApiConfig.baseUrl,
      url: config.nasaApiConfig.asteroidsUrl,
      validateStatus: () => true,
      params: {
        start_date: format(from, "yyyy-MM-dd"),
        end_date: format(to, "yyyy-MM-dd"),
        api_key: config.nasaApiConfig.key
      }
    };
  }

  private buildGetManifestRequest(roverName: string): AxiosRequestConfig {
    return {
      baseURL: config.nasaApiConfig.baseUrl,
      url: `${config.nasaApiConfig.photosRoverManifestUrl}${roverName}`,
      validateStatus: () => true,
      params: {
        api_key: config.nasaApiConfig.key
      }
    };
  }

  private buildGetPhotosRequest({ roverName, earthDate }: RoverPhotoParams): AxiosRequestConfig {
    return {
      baseURL: config.nasaApiConfig.baseUrl,
      url: `${config.nasaApiConfig.roverPhotosUrl}${roverName}/photos`,
      validateStatus: () => true,
      params: {
        earth_date: earthDate,
        api_key: config.nasaApiConfig.key
      }
    };
  }
}
