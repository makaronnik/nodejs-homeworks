const fs = require('fs/promises');
const path = require('path');
const nanoid = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const contactsBuffer = await fs.readFile(contactsPath);

  return JSON.parse(contactsBuffer) || [];
};

const getContactById = async contactId => {
  const contacts = await listContacts();

  return contacts.find(({ id }) => id === contactId) || null;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid.nanoid(), name, email, phone };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const removeContact = async contactId => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
