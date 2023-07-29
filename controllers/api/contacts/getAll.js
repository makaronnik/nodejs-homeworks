const { catchAsync } = require('../../../utils/decorators');
const { listContacts } = require('../../../services/contactsService');

module.exports = catchAsync(async (req, res) => {
  const contacts = await listContacts(req);

  res.status(200).json(contacts);
});
