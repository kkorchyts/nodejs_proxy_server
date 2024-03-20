import { Exception } from "../../../common/exceptions/Exception";
import { Period } from "../../../web-api/utils/date-utils";
import { NasaService } from "../nasa.service";
import { RoverPhoto } from "../../../clients/nasa/dto/rover-photo";
import { NasaClientInterface } from "../../../clients/nasa/nasa.client.interface";
import { MeteorsCountInfo, MeteorsInfo } from "../dto/meteors-info";
import { NasaAsteroids } from "../../../clients/nasa/dto/nasa-asteroids";

export class NasaServiceImpl implements NasaService {
  constructor(readonly nasaClient: NasaClientInterface) {}

  async getAsteroidsByPeriod(
    period: Period,
    countOnly: boolean,
    dangerousOnly: boolean
  ): Promise<Record<string, MeteorsInfo>> {
    const asteroidsData = await this.nasaClient.getAsteroid(period);
    return this.parseNasaAsteroidsData(asteroidsData, countOnly, dangerousOnly);
  }

  async getLastRoverPhoto(roverName: string): Promise<RoverPhoto> {
    const earthDate = await this.getRoverPhotoLastDate(roverName);
    const { photos } = await this.nasaClient.getRoverPhotos({
      roverName,
      earthDate
    });
    const { img_src } = photos.sort((a: any, b: any) => a.id - b.id).pop();
    return { img_src };
  }

  private async getRoverPhotoLastDate(roverName: string) {
    const { max_date } = (await this.nasaClient.getPhotosManifest(roverName)).photo_manifest;
    if (!max_date) {
      throw new Exception(500, `Wrong max_date from rover ${roverName}. max_date = ${max_date}`);
    }
    return max_date;
  }

  private parseAsteroidsToArray(dataArray: any[], dangerousOnly: boolean): MeteorsInfo {
    return {
      meteors: dataArray
        .filter((data) => !dangerousOnly || data.is_potentially_hazardous_asteroid === true)
        .map((data) => ({
          id: data.id,
          name: data.name,
          estimated_diameter_in_meters: {
            estimated_diameter_min: data.estimated_diameter.meters.estimated_diameter_min,
            estimated_diameter_max: data.estimated_diameter.meters.estimated_diameter_max
          },
          is_potentially_hazardous_asteroid: data.is_potentially_hazardous_asteroid,
          close_approach_date_full: data.close_approach_data[0].close_approach_date_full,
          relative_velocity_kilometers_per_second:
            data.close_approach_data[0].relative_velocity.kilometers_per_second
        }))
    };
  }

  private parseAsteroidsToCount(dataArray: any, dangerousOnly: boolean): MeteorsCountInfo {
    return {
      count: dataArray.reduce(
        (acc: number, data: any) =>
          !dangerousOnly || data.is_potentially_hazardous_asteroid === true ? acc + 1 : acc,
        0
      )
    };
  }
  private parseNasaAsteroidsData(
    data: NasaAsteroids,
    countOnly: boolean,
    dangerousOnly: boolean
  ): Record<string, MeteorsInfo> {
    const asteroidArrayParser = countOnly ? this.parseAsteroidsToCount : this.parseAsteroidsToArray;
    return Object.keys(data.near_earth_objects).reduce((acc, key) => {
      return {
        ...acc,
        [key]: asteroidArrayParser(data.near_earth_objects[key], dangerousOnly)
      };
    }, {});
  }
}
