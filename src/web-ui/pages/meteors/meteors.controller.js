import path from "path";
import {__dirname} from "../utils/utils.js";
import {getMeteorsDataByPeriod} from "./meteors.model.js";

export const meteorsFormController = async (req, res, next) => {
    try {
        let meteors;
        const meteorsFilter = req.metadata["meteorsFilter"];
        if (meteorsFilter.date) {
            meteors = await getMeteorsDataByPeriod(meteorsFilter);
        }
        res.render(path.join(__dirname(import.meta.url), "meteors-form.view.html"), { asteroids: meteors || {}, meteorsFilter });
    } catch (error) {
        next(error);
    }
};