export const exceptionFilterApiMiddleware = (err, req, res, next) => {
  const errorCode = err.statusCode || 500;
  res.status(errorCode).json({
    error: {
      code: errorCode,
      message: err.message,
      errors: err.errors,
    }
  });
};

