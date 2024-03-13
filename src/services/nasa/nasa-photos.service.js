import {nasaGetPhotosClient, nasaGetPhotosManifestClient} from "../../clients/index.js";
import {Exception} from "../../api/exceptions/Exception.js";

const getRoverPhotoLastDate = async (roverName) => {
    const {max_date} = (await nasaGetPhotosManifestClient(roverName)).photo_manifest;
    if (!max_date) {
        throw new Exception(500, `Wrong max_date from rover ${roverName}. max_date = ${max_date}`);
    }
    return max_date;
}

export const getLastRoverPhoto = async (roverName) => {
    const earthDate = await getRoverPhotoLastDate(roverName);
    const {photos} = await nasaGetPhotosClient({roverName, earthDate});
    const {img_src} = photos.sort((a, b) => a.id - b.id).pop();
    return {img_src};
}