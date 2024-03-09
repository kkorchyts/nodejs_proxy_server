import {axiosNasaClient} from "../../clients/index.js";
import {getPreviousPeriod, parseDate} from "./dateUtils.js";

export const handler = async (req, res) => {
    const dateQuery = req.query.date;
    const {errorMessage, date} = parseDate(dateQuery);
    if (errorMessage) {
        res.status(400).send(errorMessage);
        return;
    }

    try {
        const period = getPreviousPeriod(date);
        const response = await axiosNasaClient.getAsteroidsCountByPeriod(period);
        res.set("Content-Type", "application/json")
        res.send(JSON.stringify(response, null, 2));
    } catch (error) {
        res.status(500).send("Internal server error. See the logs for more details.")
    }
}
