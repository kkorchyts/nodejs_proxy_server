import axios from "axios";

const NASA_BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
const API_KEY = 'HbHtaeBq9uBvhnOgHevSduGXNvxK5T6ItTO7yPWg';

export class AxiosNasaClient {
    async getAsteroidsCountByPeriod(from, to) {
        return axios.request(buildRequest(from, to))
    }
}

const buildRequest = (from, to) => {
    return {
        baseURL: NASA_BASE_URL,
        params: {
            start_date: from,
            end_date: to,
            api_key: API_KEY
        }
    }
}