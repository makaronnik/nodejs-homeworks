const Joi = require('joi');
const { emailRegexp } = require('../../../utils/refexps');

const schemaRegisterUser = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  schemaRegisterUser,
};
