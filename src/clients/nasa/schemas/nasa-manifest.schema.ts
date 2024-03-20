import Joi from "joi";
import "joi-extract-type";

export const nasaManifestSchema = Joi.object({
  photo_manifest: Joi.object({
    max_date: Joi.date()
  }).required()
}).messages({
  "object.base": "Nasa Rover Manifest response: Invalid request format",
  "any.required": "Nasa Rover Manifest response: {#label} is a required field"
});
