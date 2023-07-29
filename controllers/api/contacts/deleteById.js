const { catchAsync } = require('../../../utils/decorators');
const { removeContact } = require('../../../services/contactsService');

exports.deleteById = catchAsync(async (req, res) => {
  const contactId = req.params.contactId;

  await removeContact(contactId);

  res.status(200).json({ message: 'Contact deleted successfully!' });
});
