import Joi from "joi";
import { extractType } from "@hapi/joi";
import "joi-extract-type";

export const userDataSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().min(5).required()
}).messages({
  "object.base": "UserData invalid format",
  "any.required": "UserData invalid format: {#label} is a required field"
});

export type UserData = extractType<typeof userDataSchema>;
