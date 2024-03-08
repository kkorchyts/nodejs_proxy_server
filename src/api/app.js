import express from "express"
import {retrieveAsteroidsDataHandler} from "./handler/retrieve-asteroids-data.handler.js";

export const app = express();
app.get('/meteors', retrieveAsteroidsDataHandler)
