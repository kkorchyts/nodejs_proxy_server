import express from "express"
import {handler} from "./handler/handler.js";

export const app = express();
app.get('/meteors', handler)
