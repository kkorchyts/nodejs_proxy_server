import Joi from "joi";

export const roverNameSchema = Joi.string()
  .valid("curiosity", "opportunity", "spirit")
  .messages({
    "string.base": "RoverName must be a string",
    "string.empty": "RoverName cannot be an empty field",
    "any.only": "RoverName must be one of [curiosity, opportunity, spirit]",
    "any.required": "RoverName is a required field",
  });
