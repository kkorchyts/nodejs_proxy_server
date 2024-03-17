import Joi from "joi";
import JoiDate from "@joi/date";
const extendedJoi = Joi.extend(JoiDate);

export const meteorsFilterApiSchema = Joi.object({
    date: extendedJoi.date().required().format("YYYY-MM-DD").utc(),
    dangerousOnly: Joi.boolean().default(false),
    countOnly: Joi.boolean().default(false)
});