import { getLastRoverPhoto } from "../../services/nasa/nasa-photos.service.js";

export const handler = async (req, res, next) => {
  const roverName = req.params["rover"];
  try {
    const {img_src} = await getLastRoverPhoto(roverName);
    res.render("rover-photos/data.html", {roverName, img_src});
  } catch (error) {
    next(error);
  }
};
