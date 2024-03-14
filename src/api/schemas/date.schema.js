import Joi from "joi";
import JoiDate from "@joi/date";

const extendedJoi = Joi.extend(JoiDate);

export const dateSchema = extendedJoi
  .date()
  .required()
  .format("YYYY-MM-DD")
  .utc();
