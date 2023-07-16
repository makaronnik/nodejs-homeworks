const { catchAsync } = require('../../utils/decorators');
const { listContacts } = require('../../models/contacts');

const getAll = async () => {
  return await listContacts();
};

module.exports = { getAll: catchAsync(getAll) };
