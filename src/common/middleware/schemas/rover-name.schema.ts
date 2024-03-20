import Joi from "joi";
import { extractType } from "@hapi/joi";
import "joi-extract-type";

export const roverNameSchema = Joi.string()
  .valid("curiosity", "opportunity", "spirit")
  .messages({
    "string.base": "RoverName must be a string",
    "string.empty": "RoverName cannot be an empty field",
    "any.only": "RoverName must be one of [curiosity, opportunity, spirit]",
    "any.required": "RoverName is a required field"
  });

export type RoverName = extractType<typeof roverNameSchema>;
