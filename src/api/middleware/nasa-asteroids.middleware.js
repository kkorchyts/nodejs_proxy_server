import {validateDate} from "../utils/date-utils.js";
import {Exception} from "../exceptions/Exception.js";

export const checkQueryParamMiddleware = (req, res, next) => {
    const {date} = req.query;
    const {errorMessage} = validateDate(date);
    if (errorMessage) {
        throw new Exception(400, errorMessage);
    }
    next();
}