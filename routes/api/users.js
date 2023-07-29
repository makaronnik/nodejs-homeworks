const express = require('express');
const { authenticate } = require('../../utils/middleware/authMiddleware');
const {
  register,
  login,
  logout,
  current,
} = require('../../controllers/api/users');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/current', authenticate, current);

module.exports = router;
