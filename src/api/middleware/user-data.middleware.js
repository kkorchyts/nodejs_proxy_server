import {Exception} from "../exceptions/Exception.js";

function validateStringNotEmpty(string, errorMessagePrefix, errors) {
    if (!string || string.trim().length === 0) {
        errors.push(`${errorMessagePrefix} is empty`);
    }
}

export const checkUserDataMiddleware = (req, res, next) => {
    const userData = req.body;
    const errors = [];
    validateStringNotEmpty(userData.id, "User id", errors);
    validateStringNotEmpty(userData.name, "User name", errors);
    if (errors.length > 0) {
        const exception = new Exception(400, "User data didn't passed validation");
        exception.errors = errors;
        throw exception;
    }
    next();
}