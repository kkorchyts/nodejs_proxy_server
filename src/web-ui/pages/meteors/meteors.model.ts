import { getPreviousPeriod } from "../../../web-api/utils/date-utils";
import { nasaService } from "../../../services";

export const getMeteorsDataByPeriod = async ({ date, countOnly, dangerousOnly }: any) => {
  const period = getPreviousPeriod(date);
  return await nasaService.getAsteroidsByPeriod(period, countOnly, dangerousOnly);
};
