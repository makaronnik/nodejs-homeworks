const { HttpError } = require('../../../utils/errors');
const { schemaUpdateStatus } = require('./validators');
const { catchAsync } = require('../../../utils/decorators');
const { updateStatusContact } = require('../../../services/contactsService');

module.exports = catchAsync(async (req, res) => {
  const { error, value } = schemaUpdateStatus.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const contact = req.contact;

  const updatedContact = await updateStatusContact(contact, value);

  updatedContact.owner = undefined;

  res.status(200).json(updatedContact);
});
