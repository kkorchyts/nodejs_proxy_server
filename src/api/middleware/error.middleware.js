import {constants} from "http2"
import http from "http"

export const errorMiddleware = (err, req, res, next) => {
    const errorCode = err.statusCode || 500;
    res.status(errorCode);
    const resBody = {
        code: errorCode,
        message: err.message,
        errors: err.errors,
    };
    res.json(resBody);
}