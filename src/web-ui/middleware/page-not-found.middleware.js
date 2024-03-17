import path from "path";
import {__dirname} from "../pages/utils/utils.js";

export const pageNotFoundMiddleware = (err, req, res, next) => {
    res.status(400).render(path.resolve(__dirname(import.meta.url), "../views", "page-not-found.html"));
};