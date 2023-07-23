const Contact = require('../models/contactModel');

const listContacts = () => {
  return Contact.find({});
};

module.exports = {
  listContacts,
};
