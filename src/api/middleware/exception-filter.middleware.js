export const exceptionFilterMiddleware = (err, req, res, next) => {
    const errorCode = err.statusCode || 500;
    res.status(errorCode).json({
        code: errorCode,
        message: err.message,
        errors: err.errors,
    });
}