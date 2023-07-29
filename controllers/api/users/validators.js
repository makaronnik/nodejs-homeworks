const Joi = require('joi');
const { emailRegexp } = require('../../../utils/refexps');

const schemaRegisterUser = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemaLoginUser = schemaRegisterUser;

const schemaUpdateUser = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

module.exports = {
  schemaRegisterUser,
  schemaLoginUser,
  schemaUpdateUser,
};
