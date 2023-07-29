const { HttpError } = require('../../../utils/errors');
const { catchAsync } = require('../../../utils/decorators');
const { schemaRegisterUser } = require('./validators');
const { addUser, getUserByEmail } = require('../../../services/usersService');

module.exports = catchAsync(async (req, res) => {
  const { error, value } = schemaRegisterUser.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  if (await getUserByEmail(value.email)) {
    throw new HttpError(409, 'Email in use');
  }

  const user = await addUser(value);

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});
