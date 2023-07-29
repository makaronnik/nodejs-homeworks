const Joi = require('joi');
const { nameRegexp, phoneRegexp } = require('../../../utils/refexps');

const schemaCreateContact = Joi.object({
  name: Joi.string().pattern(nameRegexp).min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegexp).min(7).max(18).required(),
  favorite: Joi.boolean().optional().default(false),
}).options({ abortEarly: false });

const schemaUpdateContactFully = schemaCreateContact;

const schemaUpdateContactPartially = Joi.object({
  name: Joi.string().pattern(nameRegexp).min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(phoneRegexp).min(7).max(18).optional(),
  favorite: Joi.boolean().optional(),
})
  .or('name', 'email', 'phone', 'favorite')
  .options({ abortEarly: false });

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  schemaCreateContact,
  schemaUpdateContactFully,
  schemaUpdateContactPartially,
  schemaUpdateStatus,
};
