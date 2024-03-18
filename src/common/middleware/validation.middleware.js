import { Exception } from "../exceptions/Exception.js";
import { userDataSchema } from "../schemas/user-data.schema.js";
import { roverNameSchema } from "../schemas/rover-name.schema.js";
import { dateSchema } from "../schemas/date.schema.js";
import {meteorsFilterUiSchema} from "../schemas/meteors-filter-ui.schema.js";
import {meteorsFilterApiSchema} from "../schemas/meteors-filter-api.schema.js";

const queryDateReader = (req) => {
  return {
    data: req.query["date"],
    key: "date" }
};

const paramRoverNameReader = (req) => {
  return {
    data: req.params["rover"],
    key: "roverName"
  };
}

const bodyUserDataReader = (req) => {
  return {
    data: req.body,
    key: "bodyUserData"
  };
}

const paramMeteorsFilter = (req) => {
  return {
    data: {
      date: req.query.date,
      countOnly: req.query["count"],
      dangerousOnly: req.query["were-dangerous-meteors"]
    },
    key: "meteorsFilter"
  };
}

const validator = (schema, reader) => {
  return async (req, res, next) => {
    try {
      const { data, key } = reader(req);
      req.metadata = { ...(req.metadata || {}), [key]: await schema.validateAsync(data) };
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

export const validateMeteorsFilterApiMiddleware = validator(
    meteorsFilterApiSchema,
    paramMeteorsFilter,
);

export const validateMeteorsFilterUiMiddleware = validator(
    meteorsFilterUiSchema,
    paramMeteorsFilter,
);
