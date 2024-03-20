import { Period } from "../../web-api/utils/date-utils";
import { RoverPhoto } from "../../clients/nasa/dto/rover-photo";

export interface NasaService {
  getLastRoverPhoto(roverName: string): Promise<RoverPhoto>;
  getAsteroidsByPeriod(period: Period, countOnly: boolean, dangerousOnly: boolean): Promise<any>;
}
