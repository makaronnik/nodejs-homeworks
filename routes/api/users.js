const express = require('express');
const { register, login, logout } = require('../../controllers/api/users');
const { authenticate } = require('../../utils/middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);

module.exports = router;
