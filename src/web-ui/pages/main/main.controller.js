import path from "path";
import {__dirname} from "../utils/utils.js";

export const handler = async (req, res, next) => {
    try {
        res.render(path.join(__dirname(import.meta.url), "main.view.html"));
    } catch (error) {
        next(error);
    }
};