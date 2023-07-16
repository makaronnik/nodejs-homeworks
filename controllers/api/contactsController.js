const { catchAsync } = require('../../utils/decorators');
const {
  listContacts,
  getContactById,
  addContact,
} = require('../../models/contacts');
const { HttpError } = require('../../utils/errors');
const {
  schemaCreateContact,
} = require('../../utils/validators/contactsValidators');

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

module.exports = {
  getAll: catchAsync(getAll),
  getById: catchAsync(getById),
  create: catchAsync(create),
};
