import Joi from "joi";
import {dateSchema} from "./date.schema.js";

export const nasaManifestResponseSchema = Joi.object({
    status: Joi.number().required(),
    data: Joi.object({
        photo_manifest: Joi.object({
            max_date: dateSchema
        }).required()
    }).required()
}).messages({
    "object.base": "Nasa Rover Manifest response: Invalid request format",
    "any.required": "Nasa Rover Manifest response: {#label} is a required field"
});