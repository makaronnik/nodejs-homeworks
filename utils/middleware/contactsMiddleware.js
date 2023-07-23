const { HttpError } = require('../errors');
const {
  isContactIdValid,
  getContactById,
} = require('../../services/contactsService');

const checkContactId = (req, _, next) => {
  const contactId = req.params.contactId;

  if (!isContactIdValid(contactId)) {
    throw new HttpError(404, 'Contact does not exist!');
  }

  next();
};

const checkIsContactExistsById = async (req, _, next) => {
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId);

  if (!contact) {
    next(new HttpError(404, 'Contact does not exist!'));

    return;
  }

  next();
};

module.exports = {
  checkContactId,
  checkIsContactExistsById,
};
