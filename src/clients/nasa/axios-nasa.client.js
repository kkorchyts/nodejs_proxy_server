import axios from "axios";
import { config } from "../../config/config.js";

export class AxiosNasaClient {
    async getAsteroidsCountByPeriod(from, to) {
        return axios.request(buildRequest(from, to))
    }
}

const buildRequest = (from, to) => {
    return {
        baseURL: config.nasaApiConfig.url,
        params: {
            start_date: from,
            end_date: to,
            api_key: config.nasaApiConfig.key
        }
    }
}