const { catchAsync } = require('../../../utils/decorators');
const { listContacts } = require('../../../services/contactsService');

module.exports = catchAsync(async (_, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
});
