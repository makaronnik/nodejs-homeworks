const Joi = require('joi');
const { HttpError } = require('../../utils/errors');
const { catchAsync } = require('../../utils/decorators');
const { listContacts } = require('../../services/contactsService');
const {
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require('../../models/contacts');
const {
  nameRegexp,
  phoneRegexp,
} = require('../../utils/refexps/contactsRegexps');

const schemaCreateContact = Joi.object({
  name: Joi.string().pattern(nameRegexp).min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegexp).min(7).max(18).required(),
}).options({ abortEarly: false });

const schemaUpdateContact = Joi.object({
  name: Joi.string().pattern(nameRegexp).min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(phoneRegexp).min(7).max(18).optional(),
})
  .or('name', 'email', 'phone')
  .options({ abortEarly: false });

const getAll = async (_, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId);

  if (!contact) {
    throw new HttpError(404, 'Not found');
  }

  res.status(200).json(contact);
};

const create = async (req, res) => {
  const { error, value } = schemaCreateContact.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const { name, email, phone } = value;

  const newContact = await addContact(name, email, phone);

  res.status(201).json(newContact);
};

const update = async (req, res) => {
  const contactId = req.params.contactId;

  const { error, value } = schemaUpdateContact.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const { name = null, email = null, phone = null } = value;

  const updatedContact = await updateContact(contactId, name, email, phone);

  if (!updatedContact) {
    throw new HttpError(404, 'Not found');
  }

  res.status(200).json(updatedContact);
};

const deleteById = async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await removeContact(contactId);

  if (!contact) {
    throw new HttpError(404, 'Not found');
  }

  res.status(200).json({ message: 'contact deleted' });
};

module.exports = {
  getAll: catchAsync(getAll),
  getById: catchAsync(getById),
  create: catchAsync(create),
  update: catchAsync(update),
  deleteById: catchAsync(deleteById),
};
