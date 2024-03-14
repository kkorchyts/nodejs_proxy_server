import Joi from "joi";

export const userDataSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().min(5).required(),
}).messages({
  "object.base": "UserData invalid format",
  "any.required": "UserData invalid format: {#label} is a required field",
});
