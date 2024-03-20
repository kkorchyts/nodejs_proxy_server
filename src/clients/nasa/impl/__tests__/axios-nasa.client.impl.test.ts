import nock from "nock";
import { faker } from "@faker-js/faker";
import { config } from "../../../../config/config";
import { AxiosNasaClientImpl } from "../axios-nasa.client.impl";
import { nasaAsteroidsSchema } from "../../schemas/nasa-asteroids.schema";
jest.mock("../../schemas/nasa-asteroids.schema");
import { when } from "jest-when";

jest.mock("../../../../config/config", () => ({
  ...jest.requireActual("../../../../config/config"),
  config: {
    nasaApiConfig: {
      key: "key",
      baseUrl: "http://fakeurl.com",
      asteroidsUrl: "/asteroidsUrl",
      roverPhotosUrl: "/roverPhotosUrl",
      photosRoverManifestUrl: "/photosRoverManifestUrl"
    }
  }
}));

describe("axios-nasa client", () => {
  describe("getAsteroid", () => {
    const initialPeriod = {
      from: faker.date.past({ years: 2 }),
      to: faker.date.past({ years: 1 })
    };
    const url = `${config.nasaApiConfig.asteroidsUrl}?start_date=${initialPeriod.from.toISOString()}&end_date=${initialPeriod.to.toISOString()}&api_key=${config.nasaApiConfig.key}`;
    const nasaAsteroidResponse = { validated: false };

    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it("succeeded", async () => {
      nock(config.nasaApiConfig.baseUrl)
        .get(url)
        .reply(200, nasaAsteroidResponse);
      const expectedResult = { validated: true };
      when(nasaAsteroidsSchema.validateAsync).mockResolvedValue(expectedResult);

      const nasaClient = new AxiosNasaClientImpl();
      const actualResult = await nasaClient.getAsteroid(initialPeriod);

      expect(nasaAsteroidsSchema.validateAsync).toHaveBeenCalledWith(
        nasaAsteroidResponse,
        expect.any(Object)
      );
      expect(nasaAsteroidsSchema.validateAsync).toHaveBeenCalledTimes(1);
      expect(actualResult).toEqual(expectedResult);
    });

    it("validation error", async () => {
      nock(config.nasaApiConfig.baseUrl)
        .get(url)
        .reply(200, nasaAsteroidResponse);
      when(nasaAsteroidsSchema.validateAsync).mockImplementation(() => {
        throw new Error();
      });

      const nasaClient = new AxiosNasaClientImpl();
      await expect(
        async () => await nasaClient.getAsteroid(initialPeriod)
      ).rejects.toThrow();
      expect(nasaAsteroidsSchema.validateAsync).toHaveBeenCalledWith(
        nasaAsteroidResponse,
        expect.any(Object)
      );
      expect(nasaAsteroidsSchema.validateAsync).toHaveBeenCalledTimes(1);
    });

    it("Internal server error", async () => {
      nock(config.nasaApiConfig.baseUrl)
        .get(url)
        .replyWithError("Internal server error");

      const nasaClient = new AxiosNasaClientImpl();
      await expect(
        async () => await nasaClient.getAsteroid(initialPeriod)
      ).rejects.toThrow();
      expect(nasaAsteroidsSchema.validateAsync).toHaveBeenCalledTimes(0);
    });
  });
});
