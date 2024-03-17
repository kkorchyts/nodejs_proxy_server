import Joi from "joi";
import { dateSchema } from "./date.schema.js";

export const nasaRoverPhotosResponseSchema = Joi.object({
  status: Joi.number().required(),
  data: Joi.object({
    photos: Joi.array()
      .items(
        Joi.object({
          id: Joi.number().required(),
          img_src: Joi.string().uri().required(),
          earth_date: dateSchema,
        }),
      )
      .required(),
  }).required(),
}).messages({
  "object.base": "Nasa Rover Photos response: Invalid request format",
  "any.required": "Nasa Rover Photos response: {#label} is a required field",
});
