export const exceptionFilterMiddleware = (err, req, res, next) => {
  const errorCode = err.statusCode || 500;
  res.status(errorCode).render("server-error.html", {
    error: {
      code: errorCode,
      message: err.message,
      errors: err.errors,
    }
  });
};
