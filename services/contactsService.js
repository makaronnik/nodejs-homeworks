const { Types } = require('mongoose');
const { Contact } = require('../models');

const listContacts = req => {
  const userId = req.user.id;

  const { page = 1, favorite } = req.query;

  let { limit = 20 } = req.query;

  if (limit > 100) {
    limit = 100;
  }

  const skip = (page - 1) * limit;

  const query = favorite ? { owner: userId, favorite } : { owner: userId };

  return Contact.find(query, '-owner').skip(skip).limit(limit);
};

const getContactById = contactId => {
  return Contact.findById(contactId);
};

const addContact = data => {
  return Contact.create(data);
};

const updateContactFully = (contactId, data) => {
  return Contact.findByIdAndUpdate(contactId, data, { new: true });
};

const updateContactPartially = async (contact, data) => {
  Object.keys(data).forEach(key => {
    contact[key] = data[key];
  });

  return contact.save();
};

const updateStatusContact = (contact, data) =>
  updateContactPartially(contact, data);

const removeContact = contactId => {
  return Contact.findByIdAndDelete(contactId);
};

const isContactIdValid = contactId => {
  return Types.ObjectId.isValid(contactId);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactFully,
  updateContactPartially,
  updateStatusContact,
  removeContact,
  isContactIdValid,
};
