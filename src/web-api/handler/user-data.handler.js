import { postUserData } from "../../services/user/user.service.js";

export const handler = async (req, res, next) => {
  try {
    const userData = req.metadata["bodyUserData"];
    const response = postUserData(userData);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
