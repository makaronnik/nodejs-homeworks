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
  checkAndSetAvailableContactById,
} = require('../../utils/middleware/contactsMiddleware');
const { authenticate } = require('../../utils/middleware/authMiddleware');

const router = express.Router();

router.use(authenticate);

router.route('/').get(getAll).post(create);

router.use('/:contactId', checkContactId, checkAndSetAvailableContactById);

router.route('/:contactId/favorite').patch(updateStatus);

router
  .route('/:contactId')
  .get(getById)
  .put(updateFully)
  .patch(updatePartially)
  .delete(deleteById);

module.exports = router;
