const { HttpError } = require('../../../utils/errors');
const { schemaCreateContact } = require('./validators');
const { catchAsync } = require('../../../utils/decorators');
const { addContact } = require('../../../services/contactsService');

module.exports = catchAsync(async (req, res) => {
  const { error, value } = schemaCreateContact.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const newContact = await addContact(value);

  res.status(201).json(newContact);
});
