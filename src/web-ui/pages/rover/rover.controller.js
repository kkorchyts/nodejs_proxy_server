import {getLastPhotoByRoverName} from "./rover-photos.model.js";
import path from "path";
import {__dirname} from "../utils/utils.js";

export const roverNameFormController = async (req, res, next) => {
    try {
        res.render(path.join(__dirname(import.meta.url), "rover-name-form.view.html"));
    } catch (error) {
        next(error);
    }
}

export const roverPhotoController = async (req, res, next) => {

    try {
        const roverName = req.metadata.roverName;
        const {img_src} = await getLastPhotoByRoverName(roverName);
        res.render(path.join(__dirname(import.meta.url), "rover-photo.view.html"), {roverName, img_src});
    } catch (error) {
        next(error);
    }
};