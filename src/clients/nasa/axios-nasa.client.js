import axios, {HttpStatusCode} from "axios";
import {config} from "../../config/config.js";

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
        const {status, data} = await axios.request(request);
        if (status !== HttpStatusCode.Ok) {
            throw new Error(`NASA API response is ${status}`);
        }
        return data;
    }
}
