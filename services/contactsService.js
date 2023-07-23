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

module.exports = {
  isContactIdValid,
  listContacts,
  getContactById,
  addContact,
  updateContactFully,
  updateContactPartially,
};
