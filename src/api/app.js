import express from "express"
import { axiosNasaClient } from "../clients/index.js";

export const app = express();
app.get('/', async (req, res) => {
    const body = await axiosNasaClient.getAsteroidsCountByPeriod("2024-02-26", "2024-03-01")
        .then(res => res.data)
        .catch(err => err.message);
    res.set("Content-Type", "application/json")
    res.send(JSON.stringify(body, null, 2));
})



