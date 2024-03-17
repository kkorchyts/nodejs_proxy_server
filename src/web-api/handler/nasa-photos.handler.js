import { getLastRoverPhoto } from "../../services/nasa/nasa-photos.service.js";

export const handler = async (req, res, next) => {
  try {
    const roverName = req.metadata["roverName"];
    const {img_src} = await getLastRoverPhoto(roverName);
    res.json({img_src});
  } catch (error) {
    next(error);
  }
};
