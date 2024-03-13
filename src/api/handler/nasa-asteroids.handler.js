import {nasaAsteroidService} from "../../services/index.js";
import {getPreviousPeriod} from "../utils/date-utils.js";

const parseQueryParams = (query) => {
    return {
        date: query.date,
        countOnly: !query["count"] ? false : query.count.toLowerCase() === "true",
        dangerousOnly: !query["were-dangerous-meteors"] ? false : query["were-dangerous-meteors"].toLowerCase() === "true",
    }
}

export const nasaAsteroidsHandler = async (req, res, next) => {
    const {date, countOnly, dangerousOnly} = parseQueryParams(req.query);
    try {
        const period = getPreviousPeriod(date);
        const response = await nasaAsteroidService.getAsteroidsByPeriod(period, countOnly, dangerousOnly);
        res.json(response);
    } catch (error) {
        next(error)
    }
}
