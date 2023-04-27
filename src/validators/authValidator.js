const Joi = require("joi");

const validate = require("./validate");

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .messages({
      "string.empty": "email is required",
      "string.email": "email must be a valid email"
    }),

  password: Joi.string()
    .alphanum()
    .trim()
    .min(6)
    .required()
    .messages({
      "string.empty": "password is required",
      "string.alphanum":
        "password must contain number or alphabet",
      "string.min":
        "password must have at least 6 characters"
    })
});

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.empty": "email is required",
    "string.email": "email must be a valid email"
  }),
  password: Joi.string().required().messages({
    "string.empty": "password is required",
    "string.alphanum":
      "password must contain number or alphabet",
    "string.min": "password must have at least 6 characters"
  })
});

exports.validateRegister = validate(registerSchema);

exports.validateLogin = validate(loginSchema);
