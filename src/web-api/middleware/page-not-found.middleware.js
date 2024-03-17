export const pageNotFoundMiddleware = (err, req, res, next) => {
    res.status(400).json({
        message: "Page not found"
    });
};

