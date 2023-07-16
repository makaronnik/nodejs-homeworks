const express = require('express');
const {
  getAll,
  getById,
  create,
} = require('../../controllers/api/contactsController');

const router = express.Router();

router.get('/', (req, res, next) => {
  getAll(req, res, next);
});

router.get('/:contactId', (req, res, next) => {
  getById(req, res, next);
});

router.post('/', async (req, res, next) => {
  create(req, res, next);
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
