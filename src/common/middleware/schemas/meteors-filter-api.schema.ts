import Joi from "joi";
import { extractType } from "@hapi/joi";
import "joi-extract-type";
import JoiDate from "@joi/date";
const extendedJoi = Joi.extend(JoiDate);

export const meteorsFilterApiSchema = Joi.object({
  date: extendedJoi.date().required().format("YYYY-MM-DD"),
  dangerousOnly: Joi.boolean().default(false),
  countOnly: Joi.boolean().default(false)
});

export type MeteorsFilterApi = extractType<typeof meteorsFilterApiSchema>;
