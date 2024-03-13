import {postUserData} from "../../services/user/user.service.js";

export const handler = async (req, res, next) => {
    const userData = req.body;
    try {
        const response = postUserData(userData);
        res.json(response);
    } catch (error) {
        next(error)
    }
}