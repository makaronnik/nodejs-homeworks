const { Types } = require('mongoose');
const { Contact } = require('../models');

const listContacts = req => {
  const userId = req.user.id;

  return Contact.find({ owner: userId }, '-owner');
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
