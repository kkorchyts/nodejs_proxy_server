import { nasaService } from "../../../services";

export const getLastPhotoByRoverName = async (roverName: string) => {
  return await nasaService.getLastRoverPhoto(roverName);
};
