import {axiosNasaClient} from "../../clients/index.js";

const parseAsteroidsToArray = (dataArray, dangerousOnly) => {
    const result = [];
    dataArray.forEach((data) => {
        if (!dangerousOnly || data.is_potentially_hazardous_asteroid === true)
            result.push({
                id: data.id,
                name: data.name,
                estimated_diameter_in_meters: {
                    estimated_diameter_min: data.estimated_diameter.meters.estimated_diameter_min,
                    estimated_diameter_max: data.estimated_diameter.meters.estimated_diameter_max
                },
                is_potentially_hazardous_asteroid: data.is_potentially_hazardous_asteroid,
                close_approach_date_full: data.close_approach_data[0].close_approach_date_full,
                relative_velocity_kilometers_per_second: data.close_approach_data[0].relative_velocity.kilometers_per_second,
            });
    })
    return result;
}

const parseAsteroidsToCount = (dataArray, dangerousOnly) => {
    let count = 0;
    dataArray.forEach((data) => {
        if (!dangerousOnly || data.is_potentially_hazardous_asteroid === true) {
            count++
        }
    })
    return {count};
}

const parseNasaAsteroidsData = (data, countOnly, dangerousOnly) => {
    const result = {};
    const asteroidArrayParser = countOnly ? parseAsteroidsToCount : parseAsteroidsToArray;
    Object.keys(data.near_earth_objects)
        .forEach(
            (key) =>
                result[key] = asteroidArrayParser(data.near_earth_objects[key], dangerousOnly)
        );
    return result;
}

export class NasaAsteroidsService {
    async getAsteroidsByPeriod(period, countOnly, dangerousOnly) {
        const asteroidsData = await axiosNasaClient.getAsteroidsCountByPeriod(period);
        return parseNasaAsteroidsData(asteroidsData, countOnly, dangerousOnly);
    }
}