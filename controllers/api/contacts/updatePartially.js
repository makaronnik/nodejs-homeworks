const { HttpError } = require('../../../utils/errors');
const { catchAsync } = require('../../../utils/decorators');
const { schemaUpdateContactPartially } = require('./validators');
const { updateContactPartially } = require('../../../services/contactsService');

module.exports = catchAsync(async (req, res) => {
  const { error, value } = schemaUpdateContactPartially.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const contact = req.contact;

  const updatedContact = await updateContactPartially(contact, value);

  updatedContact.owner = undefined;

  res.status(200).json(updatedContact);
});
