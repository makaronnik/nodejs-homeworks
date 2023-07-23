const { Types } = require('mongoose');
const Contact = require('../models/contactModel');

const isContactIdValid = contactId => {
  return Types.ObjectId.isValid(contactId);
};

const listContacts = () => {
  return Contact.find({});
};

const getContactById = contactId => {
  return Contact.findById(contactId);
};

const addContact = data => {
  return Contact.create(data);
};

module.exports = {
  isContactIdValid,
  listContacts,
  getContactById,
  addContact,
};
