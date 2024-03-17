import { getPreviousPeriod } from "../utils/date-utils.js";
import { getAsteroidsByPeriod } from "../../services/nasa/nasa-asteroids.service.js";

export const handler = async (req, res, next) => {
  try {
    const { date, countOnly, dangerousOnly } = req.metadata["meteorsFilter"];
    const period = getPreviousPeriod(date);
    const response = await getAsteroidsByPeriod(
      period,
      countOnly,
      dangerousOnly,
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};
