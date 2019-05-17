const Joi = require('joi')

module.exports = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    name: Joi.string().required()
  }
}
