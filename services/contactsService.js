const { Types } = require('mongoose');
const Contact = require('../models/contactModel');

const listContacts = () => {
  return Contact.find({});
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

const updateContactPartially = async (contactId, data) => {
  const contact = await Contact.findById(contactId);

  Object.keys(data).forEach(key => {
    contact[key] = data[key];
  });

  return contact.save();
};

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
  removeContact,
  isContactIdValid,
};
