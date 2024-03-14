import {getLastRoverPhoto} from "../../services/nasa/nasa-photos.service.js";

export const handler = async (req, res, next) => {
    const roverName = req.params["rover"];
    try {
        const response = await getLastRoverPhoto(roverName);
        res.json(response);
    } catch (error) {
        next(error)
    }
}