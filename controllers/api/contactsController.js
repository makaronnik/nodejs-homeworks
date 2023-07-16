const { catchAsync } = require('../../utils/decorators');
const { listContacts, getContactById } = require('../../models/contacts');
const { HttpError } = require('../../utils/errors');

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

module.exports = { getAll: catchAsync(getAll), getById: catchAsync(getById) };
