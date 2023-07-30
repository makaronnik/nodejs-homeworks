const { HttpError } = require('../../../utils/errors');
const { catchAsync } = require('../../../utils/decorators');
const { updateUserById } = require('../../../services/usersService');
const { schemaUpdateUser } = require('./validators');

module.exports = catchAsync(async (req, res) => {
  const { error, value } = schemaUpdateUser.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const userId = req.params.userId;

  const updatedUser = await updateUserById(userId, value);

  res.status(200).json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
});
