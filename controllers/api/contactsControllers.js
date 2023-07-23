const Joi = require('joi');
const { HttpError } = require('../../utils/errors');
const { catchAsync } = require('../../utils/decorators');
const {
  listContacts,
  getContactById,
  addContact,
  updateContactFully,
  updateContactPartially,
} = require('../../services/contactsService');
const { removeContact } = require('../../models/contacts');
const {
  nameRegexp,
  phoneRegexp,
} = require('../../utils/refexps/contactsRegexps');

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

const getAll = async (_, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId);

  if (!contact) {
    throw new HttpError(404, 'Contact does not exist!');
  }

  res.status(200).json(contact);
};

const create = async (req, res) => {
  const { error, value } = schemaCreateContact.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const newContact = await addContact(value);

  res.status(201).json(newContact);
};

const updateFully = async (req, res) => {
  const contactId = req.params.contactId;

  const { error, value } = schemaUpdateContactFully.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const updatedContact = await updateContactFully(contactId, value);

  res.status(200).json(updatedContact);
};

const updatePartially = async (req, res) => {
  const contactId = req.params.contactId;

  const { error, value } = schemaUpdateContactPartially.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const updatedContact = await updateContactPartially(contactId, value);

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
  updateFully: catchAsync(updateFully),
  updatePartially: catchAsync(updatePartially),
  deleteById: catchAsync(deleteById),
};
