const { catchAsync } = require('../../../utils/decorators');
const { listContacts } = require('../../../services/contactsService');

exports.getAll = catchAsync(async (_, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
});
