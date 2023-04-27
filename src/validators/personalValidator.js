const Joi = require("joi");

const validate = require("./validate");

const personalSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      "string.empty": "first name is required",
      "string.pattern.base":
        "first name must be alphabetic characters"
    }),
  lastName: Joi.string()
    .required()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      "string.empty": "last name is required",
      "string.pattern.base":
        "last name must be alphabetic characters"
    }),
  telephone: Joi.string()
    .required()
    .length(10)
    .pattern(/^\d+$/)
    .messages({
      "string.empty": "telephone is required",
      "string.pattern.base": "telephone must be a number",
      "string.length":
        "telephone must be exactly 10 digits",
      "string.base": "telephone must be a string"
    }),
  idCard: Joi.string()
    .required()
    .length(13)
    .pattern(/^\d+$/)
    .messages({
      "string.empty": "id card is required",
      "string.pattern.base": "id card must be a number",
      "string.length": "id card must be exactly 13 digits",
      "string.base": "id card must be a string"
    })
}).unknown(true);

exports.validatePersonal = validate(personalSchema);
