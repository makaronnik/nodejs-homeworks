const { HttpError } = require('../errors');
const { catchAsync } = require('../decorators');
const { verifyToken } = require('../../services/authService');
const { getUserById } = require('../../services/usersService');

const authenticate = catchAsync(async (req, _, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    throw new HttpError(401, 'Not authorized');
  }

  try {
    const { id } = verifyToken(token);

    const user = await getUserById(id);

    if (!user || user.token !== token) {
      throw new HttpError(401, 'Not authorized');
    }

    req.user = user;

    next();
  } catch (err) {
    throw new HttpError(401, 'Not authorized');
  }
});

module.exports = {
  authenticate,
};
