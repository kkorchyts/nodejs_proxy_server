import {getPreviousPeriod} from "../../../web-api/utils/date-utils.js";
import {getAsteroidsByPeriod} from "../../../services/nasa/nasa-asteroids.service.js";

export const getMeteorsDataByPeriod = async ({date, countOnly, dangerousOnly}) => {
    const period = getPreviousPeriod(date);
    return await getAsteroidsByPeriod(
        period,
        countOnly,
        dangerousOnly,
    );
};