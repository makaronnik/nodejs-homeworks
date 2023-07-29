const { HttpError } = require('../../../utils/errors');
const { schemaUpdateStatus } = require('./validators');
const { catchAsync } = require('../../../utils/decorators');
const { updateStatusContact } = require('../../../services/contactsService');

module.exports = catchAsync(async (req, res) => {
  const contactId = req.params.contactId;

  const { error, value } = schemaUpdateStatus.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const updatedContact = await updateStatusContact(contactId, value);

  res.status(200).json(updatedContact);
});
