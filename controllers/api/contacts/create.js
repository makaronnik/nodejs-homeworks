const { HttpError } = require('../../../utils/errors');
const { schemaCreateContact } = require('./validators');
const { catchAsync } = require('../../../utils/decorators');
const { addContact } = require('../../../services/contactsService');

module.exports = catchAsync(async (req, res) => {
  const { error, value } = schemaCreateContact.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const newContact = await addContact({ ...value, owner: req.user.id });

  newContact.owner = undefined;

  res.status(201).json(newContact);
});
