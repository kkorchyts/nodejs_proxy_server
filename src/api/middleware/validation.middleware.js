import { Exception } from "../exceptions/Exception.js";
import { userDataSchema } from "../schemas/user-data.schema.js";
import { roverNameSchema } from "../schemas/rover-name.schema.js";
import { dateSchema } from "../schemas/date.schema.js";

const queryDateReader = (req) => req.query["date"];
const paramRoverNameReader = (req) => req.params["rover"];
const bodyUserDataReader = (req) => req.body;

const validator = (schema, reader) => {
  return async (req, res, next) => {
    const date = reader(req);
    try {
      await schema.validateAsync(date);
      next();
    } catch (error) {
      next(new Exception(400, error.message));
    }
  };
};

export const validateDateMiddleware = validator(dateSchema, queryDateReader);
export const validateRoverNameMiddleware = validator(
  roverNameSchema,
  paramRoverNameReader,
);
export const validateUserDataMiddleware = validator(
  userDataSchema,
  bodyUserDataReader,
);
