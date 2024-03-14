import { nasaGetAsteroidsClient } from "../../clients/index.js";

const parseAsteroidsToArray = (dataArray, dangerousOnly) => {
  return {
    meteors: dataArray
      .filter(
        (data) =>
          !dangerousOnly || data.is_potentially_hazardous_asteroid === true,
      )
      .map((data) => ({
        id: data.id,
        name: data.name,
        estimated_diameter_in_meters: {
          estimated_diameter_min:
            data.estimated_diameter.meters.estimated_diameter_min,
          estimated_diameter_max:
            data.estimated_diameter.meters.estimated_diameter_max,
        },
        is_potentially_hazardous_asteroid:
          data.is_potentially_hazardous_asteroid,
        close_approach_date_full:
          data.close_approach_data[0].close_approach_date_full,
        relative_velocity_kilometers_per_second:
          data.close_approach_data[0].relative_velocity.kilometers_per_second,
      })),
  };
};

const parseAsteroidsToCount = (dataArray, dangerousOnly) => {
  return {
    count: dataArray.reduce(
      (acc, data) =>
        !dangerousOnly || data.is_potentially_hazardous_asteroid === true
          ? acc + 1
          : acc,
      0,
    ),
  };
};

const parseNasaAsteroidsData = (data, countOnly, dangerousOnly) => {
  const asteroidArrayParser = countOnly
    ? parseAsteroidsToCount
    : parseAsteroidsToArray;
  return Object.keys(data.near_earth_objects).reduce((acc, key) => {
    return {
      ...acc,
      [key]: asteroidArrayParser(data.near_earth_objects[key], dangerousOnly),
    };
  }, {});
};

export const getAsteroidsByPeriod = async (
  period,
  countOnly,
  dangerousOnly,
) => {
  const asteroidsData = await nasaGetAsteroidsClient(period);
  return parseNasaAsteroidsData(asteroidsData, countOnly, dangerousOnly);
};
