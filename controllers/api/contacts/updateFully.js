const { HttpError } = require('../../../utils/errors');
const { catchAsync } = require('../../../utils/decorators');
const { schemaUpdateContactFully } = require('./validators');
const { updateContactFully } = require('../../../services/contactsService');

exports.updateFully = catchAsync(async (req, res) => {
  const contactId = req.params.contactId;

  const { error, value } = schemaUpdateContactFully.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const updatedContact = await updateContactFully(contactId, value);

  res.status(200).json(updatedContact);
});
