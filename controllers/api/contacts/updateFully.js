const { HttpError } = require('../../../utils/errors');
const { catchAsync } = require('../../../utils/decorators');
const { schemaUpdateContactFully } = require('./validators');
const { updateContactFully } = require('../../../services/contactsService');

module.exports = catchAsync(async (req, res) => {
  const { error, value } = schemaUpdateContactFully.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const contactId = req.params.contactId;

  const updatedContact = await updateContactFully(contactId, value);

  updatedContact.owner = undefined;

  res.status(200).json(updatedContact);
});
