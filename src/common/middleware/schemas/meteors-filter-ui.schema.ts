import Joi from "joi";
import { extractType } from "@hapi/joi";
import JoiDate from "@joi/date";
const extendedJoi = Joi.extend(JoiDate);

export const meteorsFilterUiSchema = Joi.object({
  date: extendedJoi.date().format("YYYY-MM-DD"),
  dangerousOnly: Joi.boolean().default(false),
  countOnly: Joi.boolean().default(false)
});

export type MeteorsFilterUi = extractType<typeof meteorsFilterUiSchema>;
