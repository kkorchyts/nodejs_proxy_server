import {axiosNasaClient} from "./src/clients/index.js";

axiosNasaClient.getAsteroidsCountByPeriod('2024-02-26', '2024-03-01')
    .then(res => {
        console.log('Nasa response is:', res.data);
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });