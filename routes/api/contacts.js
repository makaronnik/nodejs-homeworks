const express = require('express');
const {
  getAll,
  getById,
  create,
  updateFully,
  updatePartially,
  updateStatus,
  deleteById,
} = require('../../controllers/api/contacts');
const {
  checkContactId,
  checkIsContactExistsById,
} = require('../../utils/middleware/contactsMiddleware');

const router = express.Router();

router.route('/').get(getAll).post(create);

router.use('/:contactId', checkContactId, checkIsContactExistsById);

router.route('/:contactId/favorite').patch(updateStatus);

router
  .route('/:contactId')
  .get(getById)
  .put(updateFully)
  .patch(updatePartially)
  .delete(deleteById);

module.exports = router;
