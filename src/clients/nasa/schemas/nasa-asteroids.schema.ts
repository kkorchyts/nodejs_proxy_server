import Joi from "joi";
import "joi-extract-type";

export const nasaAsteroidsSchema = Joi.object({
  near_earth_objects: Joi.object()
    .pattern(
      Joi.string(),
      Joi.array()
        .items(
          Joi.object({
            id: Joi.string().required(),
            name: Joi.string(),
            estimated_diameter: Joi.object({
              meters: Joi.object({
                estimated_diameter_min: Joi.number(),
                estimated_diameter_max: Joi.number()
              })
            }),
            is_potentially_hazardous_asteroid: Joi.boolean().required(),
            close_approach_data: Joi.array()
              .items(
                Joi.object({
                  close_approach_date_full: Joi.date().required(),
                  relative_velocity: Joi.object({
                    kilometers_per_second: Joi.string().required()
                  }).required()
                }).required()
              )
              .required()
          }).required()
        )
        .required()
    )
    .required()
}).messages({
  "object.base": "Nasa Asteroids response: Invalid request format",
  "any.required": "Nasa Asteroids response: {#label} is a required field"
});
