import axios, {HttpStatusCode} from "axios";
import {config} from "../../config/config.js";

const parseNasaAsteroidDataArray = (dataArray) => {
    const result = [];
    dataArray.forEach((data) => {
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

const parseNasaAsteroidsData = (data) => {
    const result = {};
    Object.keys(data.near_earth_objects)
        .forEach(
            (key) =>
                result[key] = parseNasaAsteroidDataArray(data.near_earth_objects[key])
        );
    return result;
}


const buildResponse = async (res) => {
    return res;
}

const buildRequest = ({from, to}) => {
    return {
        baseURL: config.nasaApiConfig.url,
        params: {
            start_date: from,
            end_date: to,
            api_key: config.nasaApiConfig.key
        }
    }
}

export class AxiosNasaClient {
    async getAsteroidsCountByPeriod(period) {
        const request = buildRequest(period);
        const {status, data} = await buildResponse(axios.request(request));
        if (status !== HttpStatusCode.Ok) {
            throw new Error(`NASA API response is ${response.status}`);
        }
        return parseNasaAsteroidsData(data);
    }
}
