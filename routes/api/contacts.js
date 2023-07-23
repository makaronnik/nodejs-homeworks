const express = require('express');
const {
  getAll,
  getById,
  create,
  update,
  deleteById,
} = require('../../controllers/api/contactsControllers');
const {
  checkContactId,
  checkIsContactExistsById,
} = require('../../utils/middleware/contactsMiddleware');

const router = express.Router();

router.route('/').get(getAll).post(create);

router.use('/:contactId', checkContactId, checkIsContactExistsById);

router.route('/:contactId').get(getById).put(update).delete(deleteById);

module.exports = router;
