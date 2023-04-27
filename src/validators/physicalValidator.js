const Joi = require("joi");

const validate = require("./validate");

const physicalSchema = Joi.object({
  height: Joi.string()
    .required()
    .pattern(/^\d+(\.\d+)?$/)
    .messages({
      "string.empty": "height is required",
      "string.pattern.base": "height must be a number",
      "any.required": "height is a required field"
    }),
  weight: Joi.string()
    .required()
    .pattern(/^\d+(\.\d+)?$/)
    .messages({
      "string.empty": "weight is required",
      "string.pattern.base": "weight must be a number",
      "any.required": "weight is a required field"
    }),
  waist: Joi.string()
    .required()
    .pattern(/^\d+(\.\d+)?$/)
    .messages({
      "string.empty": "waist is required",
      "string.pattern.base": "waist must be a number",
      "any.required": "waist is a required field"
    }),
  date: Joi.date().required().messages({
    "string.empty": "date is required",
    "date.base": "date must be a valid date",
    "any.required": "date is a required field"
  })
}).unknown(true);

exports.validatePhysical = validate(physicalSchema);
