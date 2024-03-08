import {axiosNasaClient} from "../../clients/index.js";
import {getPreviousPeriod, parseDate} from "./dateUtils.js";

const retrieveAsteroidsData = async (date) => {
    const period = getPreviousPeriod(date);
    return await axiosNasaClient.getAsteroidsCountByPeriod(period)
        .then(res => {
            return res
        })
        .catch(() => {
            throw new Error()
        });
}

export const retrieveAsteroidsDataHandler = async (req, res) => {
    const dateQuery = req.query.date;
    const {errorMessage, date} = parseDate(dateQuery);
    if (errorMessage) {
        res.status(400).send(errorMessage);
        return;
    }

    try {
        const response = await retrieveAsteroidsData(date);
        res.set("Content-Type", "application/json")
        res.send(JSON.stringify(response, null, 2));
    } catch (error) {
        res.status(500).send("Internal server error. See the logs for more details.")
    }
}
