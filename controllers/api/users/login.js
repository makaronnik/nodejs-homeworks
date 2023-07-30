const { HttpError } = require('../../../utils/errors');
const { catchAsync } = require('../../../utils/decorators');
const { schemaLoginUser } = require('./validators');
const { getUserByEmail } = require('../../../services/usersService');

module.exports = catchAsync(async (req, res) => {
  const { error, value } = schemaLoginUser.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const user = await getUserByEmail(value.email);

  if (!user) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  const isPasswordValid = await user.validPassword(value.password);

  if (!isPasswordValid) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  const token = user.assignToken();

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});
