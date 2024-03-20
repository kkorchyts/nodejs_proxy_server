import Joi from "joi";
import "joi-extract-type";

export const nasaRoverPhotosSchema = Joi.object({
  photos: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
        img_src: Joi.string().uri().required(),
        earth_date: Joi.date()
      })
    )
    .required()
}).messages({
  "object.base": "Nasa Rover Photos response: Invalid request format",
  "any.required": "Nasa Rover Photos response: {#label} is a required field"
});
