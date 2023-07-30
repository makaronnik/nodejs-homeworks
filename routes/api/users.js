const express = require('express');
const { authenticate } = require('../../middleware/authMiddleware');
const {
  register,
  login,
  logout,
  current,
  update,
} = require('../../controllers/api/users');

const router = express.Router();

router.patch('/:userId', update);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/current', authenticate, current);

module.exports = router;
