import {getLastRoverPhoto} from "../../../services/nasa/nasa-photos.service.js";

export const getLastPhotoByRoverName = async (roverName) => {
        return await getLastRoverPhoto(roverName);
};