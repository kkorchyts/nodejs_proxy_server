import {nasaAsteroidService} from "../../services/index.js";
import {getPreviousPeriod, validateDate} from "./dateUtils.js";

const parseQueryParams = (query) => {
    return {
        date: query.date,
        countOnly: !query.count ? false : query.count.toLowerCase() === "true",
        dangerousOnly: !query["were-dangerous-meteors"] ? false : query["were-dangerous-meteors"].toLowerCase() === "true",
    }
}

export const handler = async (req, res) => {
    const {date, countOnly, dangerousOnly} = parseQueryParams(req.query);
    const {errorMessage} = validateDate(date);
    if (errorMessage) {
        res.status(400).send(errorMessage);
        return;
    }

    try {
        const period = getPreviousPeriod(date);
        const response = await nasaAsteroidService.getAsteroidsByPeriod(period, countOnly, dangerousOnly);
        res.set("Content-Type", "application/json")
        res.send(JSON.stringify(response, null, 2));
    } catch (error) {
        res.status(500).send("Internal server error. See the logs for more details.")
    }
}
