const Joi = require('joi')

module.exports = {
  body: {
    amount_paid: Joi.number().required(),
    date: Joi.date().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  }
}
