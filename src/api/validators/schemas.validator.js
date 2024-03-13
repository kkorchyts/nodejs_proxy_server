import Joi from 'joi';
import JoiDate from '@joi/date';

const extendedJoi = Joi.extend(JoiDate);

export const userDataSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(5).required()
});

export const roverNameSchema = Joi.string()
    .valid("curiosity", "opportunity", "spirit")
    .messages({
        'string.base': `RoverName must be a string`,
        'string.empty': `"RoverName" cannot be an empty field`,
        'any.only': `RoverName must be one of [curiosity, opportunity, spirit]`,
        'any.required': `"RoverName" is a required field`
    });

export const dateSchema = extendedJoi.date()
    .format('YYYY-MM-DD')
    .utc()
    .messages({
        'date.base': `Date must be in the format YYYY-MM-DD`,
        'date.format': `Date must be in the format YYYY-MM-DD`,
        'date.strict': `Date must be in UTC format`,
        'any.required': `Date is a required field`
    });
