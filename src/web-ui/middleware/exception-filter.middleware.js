import path from "path";
import {__dirname} from "../pages/utils/utils.js";

export const exceptionFilterUiMiddleware = (err, req, res, next) => {
  const errorCode = err.statusCode || 500;
  res.status(errorCode).render(path.resolve(__dirname(import.meta.url), "../views", "server-error.html"), {
    error: {
      code: errorCode,
      message: err.message,
      errors: err.errors,
    }
  });
};
