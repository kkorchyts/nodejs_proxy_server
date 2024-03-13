import {getPreviousPeriod} from "../utils/date-utils.js";
import {getAsteroidsByPeriod} from "../../services/nasa/nasa-asteroids.service.js";

const parseQueryParams = (query) => {
    return {
        date: query.date,
        countOnly: !query["count"] ? false : query.count.toLowerCase() === "true",
        dangerousOnly: !query["were-dangerous-meteors"] ? false : query["were-dangerous-meteors"].toLowerCase() === "true",
    }
}

export const handler = async (req, res, next) => {
    const {date, countOnly, dangerousOnly} = parseQueryParams(req.query);
    try {
        const period = getPreviousPeriod(date);
        const response = await getAsteroidsByPeriod(period, countOnly, dangerousOnly);
        res.json(response);
    } catch (error) {
        next(error)
    }
}
