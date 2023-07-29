const { HttpError } = require('../../../utils/errors');
const { catchAsync } = require('../../../utils/decorators');
const { schemaUpdateContactPartially } = require('./validators');
const { updateContactPartially } = require('../../../services/contactsService');

module.exports = catchAsync(async (req, res) => {
  const contactId = req.params.contactId;

  const { error, value } = schemaUpdateContactPartially.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const updatedContact = await updateContactPartially(contactId, value);

  res.status(200).json(updatedContact);
});
