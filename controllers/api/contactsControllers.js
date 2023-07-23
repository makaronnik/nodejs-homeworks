const Joi = require('joi');
const { HttpError } = require('../../utils/errors');
const { catchAsync } = require('../../utils/decorators');
const {
  listContacts,
  getContactById,
  addContact,
  updateContactFully,
  updateContactPartially,
  updateStatusContact,
  removeContact,
} = require('../../services/contactsService');
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

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const getAll = async (_, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId);

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

const updateStatus = async (req, res) => {
  const contactId = req.params.contactId;

  const { error, value } = schemaUpdateStatus.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const updatedContact = await updateStatusContact(contactId, value);

  res.status(200).json(updatedContact);
};

const deleteById = async (req, res) => {
  const contactId = req.params.contactId;

  await removeContact(contactId);

  res.status(200).json({ message: 'Contact deleted successfully!' });
};

module.exports = {
  getAll: catchAsync(getAll),
  getById: catchAsync(getById),
  create: catchAsync(create),
  updateFully: catchAsync(updateFully),
  updatePartially: catchAsync(updatePartially),
  updateStatus: catchAsync(updateStatus),
  deleteById: catchAsync(deleteById),
};
