import { Period } from "../../web-api/utils/date-utils";
import { NasaManifest } from "./dto/nasa-manifest";
import { NasaAsteroids } from "./dto/nasa-asteroids";
import { NasaRoverPhotos } from "./dto/nasa-rover-photos";
export interface RoverPhotoParams {
  roverName: string;
  earthDate: Date;
}

export interface NasaClientInterface {
  getAsteroid(period: Period): Promise<NasaAsteroids>;
  getPhotosManifest(roverName: string): Promise<NasaManifest>;
  getRoverPhotos(params: RoverPhotoParams): Promise<NasaRoverPhotos>;
}
