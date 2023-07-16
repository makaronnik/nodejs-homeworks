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

const updateContact = async (
  contactId,
  name = null,
  email = null,
  phone = null
) => {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(({ id }) => id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  const contact = contacts[contactIndex];

  const updatedContact = {
    ...contact,
    name: name ?? contact.name,
    email: email ?? contact.email,
    phone: phone ?? contact.phone,
  };

  contacts[contactIndex] = updatedContact;

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatedContact;
};

const removeContact = async contactId => {};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
