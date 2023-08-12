const express = require('express');
const { authenticate } = require('../../middleware/authMiddleware');
const {
  register,
  login,
  logout,
  current,
  update,
  updateAvatar,
  verify,
} = require('../../controllers/api/users');
const ImagesMiddlewareFactory = require('../../factories/middleware/imagesMiddlewareFactory');

const imagesMiddleware = ImagesMiddlewareFactory.getSingleMiddleware('avatar');

const router = express.Router();

router.patch('/avatars', authenticate, imagesMiddleware, updateAvatar);
router.patch('/:userId', update);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/current', authenticate, current);
router.get('/verify/:verificationToken', verify);

module.exports = router;
