import {validateDate} from "../utils/date-utils.js";


export const checkQueryParamMiddleware = (req, res, next) => {
    const {date} = req.query;
    const {errorMessage} = validateDate(date);
    if (errorMessage) {
        return res.status(400).send(errorMessage);
    }
    next();
}