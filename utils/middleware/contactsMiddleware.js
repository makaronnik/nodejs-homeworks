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

const checkAndSetAvailableContactById = async (req, _, next) => {
  const userId = req.user.id;
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId);

  if (!contact || contact.owner.toString() !== userId) {
    next(new HttpError(404, 'Contact does not exist!'));

    return;
  }

  req.contact = contact;

  next();
};

module.exports = {
  checkContactId,
  checkAndSetAvailableContactById,
};
