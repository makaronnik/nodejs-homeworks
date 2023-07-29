const { catchAsync } = require('../../../utils/decorators');
const { getContactById } = require('../../../services/contactsService');

module.exports = catchAsync(async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId);

  res.status(200).json(contact);
});
