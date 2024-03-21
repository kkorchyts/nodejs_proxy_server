import nock from "nock";
import { nasaAsteroidsSchema } from "../../schemas/nasa-asteroids.schema";
import { when } from "jest-when";
import Joi from "joi";
import { nasaClient } from "../../../index";
import { nasaManifestSchema } from "../../schemas/nasa-manifest.schema";
import { nasaRoverPhotosSchema } from "../../schemas/nasa-rover-photos.schema";

jest.mock("../../../../config/config", () => ({
  ...jest.requireActual("../../../../config/config"),
  config: {
    nasaApiConfig: {
      key: "key",
      baseUrl: "http://f.com",
      asteroidsUrl: "/meteors/",
      roverPhotosUrl: "/rover/",
      photosRoverManifestUrl: "/photos/"
    }
  }
}));

jest.mock("../../schemas/nasa-asteroids.schema");
jest.mock("../../schemas/nasa-manifest.schema");
jest.mock("../../schemas/nasa-rover-photos.schema");

describe("axios-nasa client", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const nasaResponse = { validated: false };
  const expectedClientSuccessResult = { validated: true };
  const from = new Date("2024-03-09");
  const to = new Date("2024-03-10");
  const roverName = "spirit";
  const earthDate = "2024-03-09";

  const getAsteroidsUrl = "/meteors/?start_date=2024-03-09&end_date=2024-03-10&api_key=key";
  const getManifestUrl = "/photos/spirit?api_key=key";
  const getRoverPhotoUrl = "/rover/spirit/photos?earth_date=2024-03-09&api_key=key";

  describe.each([
    [getAsteroidsUrl, nasaClient.getAsteroid, { from, to }, nasaAsteroidsSchema],
    [getManifestUrl, nasaClient.getPhotosManifest, roverName, nasaManifestSchema],
    [getRoverPhotoUrl, nasaClient.getRoverPhotos, { roverName, earthDate }, nasaRoverPhotosSchema]
  ])("getters", (url, fn: (param: any) => any, param: any, schema: Joi.AnySchema) => {
    it("succeeded", async () => {
      nock("http://f.com").get(url).reply(200, nasaResponse);

      when(schema.validateAsync).mockResolvedValue(expectedClientSuccessResult);

      const actualResult = await fn.bind(nasaClient)(param);

      expect(schema.validateAsync).toHaveBeenCalledWith(nasaResponse, expect.any(Object));
      expect(schema.validateAsync).toHaveBeenCalledTimes(1);
      expect(actualResult).toEqual(expectedClientSuccessResult);
    });

    it("validation error", async () => {
      nock("http://f.com").get(url).reply(200, nasaResponse);

      when(schema.validateAsync).mockImplementation(() => {
        throw new Error();
      });

      await expect(async () => await fn.bind(nasaClient)(param)).rejects.toThrow();
      expect(schema.validateAsync).toHaveBeenCalledWith(nasaResponse, expect.any(Object));
      expect(schema.validateAsync).toHaveBeenCalledTimes(1);
    });

    it("Internal server error", async () => {
      nock("http://f.com").get(url).replyWithError("Internal server error");

      await expect(async () => await fn.bind(nasaClient)(param)).rejects.toThrow();
      expect(schema.validateAsync).toHaveBeenCalledTimes(0);
    });
  });
});
