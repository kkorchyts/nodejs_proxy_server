import { Request, Response, NextFunction } from "express";
import { Exception } from "../exceptions/Exception";
import Joi from "joi";
import { roverNameSchema } from "./schemas/rover-name.schema";
import { userDataSchema } from "./schemas/user-data.schema";
import { meteorsFilterApiSchema } from "./schemas/meteors-filter-api.schema";
import { meteorsFilterUiSchema } from "./schemas/meteors-filter-ui.schema";

interface ReaderResult {
  data: any;
  key: string;
}

const paramRoverNameReader = (req: Request): ReaderResult => {
  return {
    data: req.params["rover"],
    key: "roverName"
  };
};

const bodyUserDataReader = (req: Request): ReaderResult => {
  return {
    data: req.body,
    key: "bodyUserData"
  };
};

const paramMeteorsFilter = (req: Request): ReaderResult => {
  return {
    data: {
      date: req.query.date,
      countOnly: req.query["count"],
      dangerousOnly: req.query["were-dangerous-meteors"]
    },
    key: "meteorsFilter"
  };
};

const validator = <T extends Joi.AnySchema>(reader: (req: Request) => ReaderResult, schema?: T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data, key } = reader(req);
      (req as any).metadata = {
        ...((req as any).metadata || {}),
        [key]: schema ? await schema.validateAsync(data) : data
      };
      next();
    } catch (error: any) {
      next(new Exception(400, error.message));
    }
  };
};

export const validateRoverNameMiddleware = validator(paramRoverNameReader, roverNameSchema);
export const validateUserDataMiddleware = validator(bodyUserDataReader, userDataSchema);

export const validateMeteorsFilterApiMiddleware = validator(
  paramMeteorsFilter,
  meteorsFilterApiSchema
);

export const validateMeteorsFilterUiMiddleware = validator(
  paramMeteorsFilter,
  meteorsFilterUiSchema
);
