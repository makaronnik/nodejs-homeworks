const express = require('express');
const { getAll } = require('../../controllers/api/contactsController');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await getAll(req, res, next);

  res.status(200).json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
